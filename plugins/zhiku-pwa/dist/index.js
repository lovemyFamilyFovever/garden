// 知库公开站 PWA 插件（dist-only，无构建步骤）
// 产出：manifest / sw.js / offline.html / 图标 / 全站 URL 清单，并往 head 注入 link+meta
// 离线策略：默认只存"读过的页"（LRU 150 篇），「离线全站」是阅读面板里的一个手动开关
import path from "path"
import fs from "fs/promises"
import { h } from "preact"
import sharp from "sharp"

const join = (...segs) => segs.filter((s) => s.length > 0).join("/").replace(/\/+/g, "/")

async function writeOut(ctx, rel, content) {
  const to = path.join(ctx.argv.output, rel)
  await fs.mkdir(path.dirname(to), { recursive: true })
  await fs.writeFile(to, content)
  return to
}

// head 里的链接一律用「/garden/...」这种带 base 前缀的绝对路径。
// 别按页面深度算 ../：Quartz 的 index 页是 <slug>/index.html、普通页是 <slug>.html，
// 两种深度不一样（实测 articles/ai/study.html 的 favicon 是 ../../ 而不是 ../../../），
// 算错一层 manifest 就直接 404、装不上。
function basePrefix(ctx) {
  const baseUrl = ctx.cfg.configuration.baseUrl
  if (ctx.argv.serve || !baseUrl) return ""
  return new URL(`https://${baseUrl}`).pathname.replace(/\/+$/, "")
}

const ICON_SRC = path.join("quartz", "static", "icon.png")

async function makeIcons() {
  const buf = await sharp(ICON_SRC).flatten({ background: "#faf8f8" }).png().toBuffer()
  const any = (size) =>
    sharp(buf).resize(size, size, { kernel: "lanczos3" }).sharpen({ sigma: 0.55 }).png().toBuffer()
  // 原图只有 200px，512 那档必然靠放大；lanczos + 轻锐化把线稿的发虚压回去一点
  const inner = await sharp(buf).resize(330, 330, { fit: "contain", background: "#faf8f8" }).toBuffer()
  const maskable = await sharp({
    create: { width: 512, height: 512, channels: 4, background: "#faf8f8" },
  })
    .composite([{ input: inner, gravity: "center" }])
    .png()
    .toBuffer()
  return {
    icon192: await any(192),
    icon512: await any(512),
    maskable,
    maskable192: await sharp(maskable).resize(192, 192).png().toBuffer(),
    apple: await any(180),
  }
}

function manifestJson() {
  return JSON.stringify({
    id: "./",
    name: "知库 · 技术花园",
    short_name: "知库",
    description: "个人知识库公开站：技术笔记、术语百科、面试题库，离线可读。",
    lang: "zh-CN",
    dir: "ltr",
    start_url: "./?source=pwa",
    scope: "./",
    display: "standalone",
    background_color: "#faf8f8",
    theme_color: "#ffffff",
    categories: ["reference", "education", "productivity"],
    icons: [
      { src: "static/pwa/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "static/pwa/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "static/pwa/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "static/pwa/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  })
}

const OFFLINE_HTML = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>离线了 · 知库</title>
<style>
html{background:#faf8f8;color:#14161a}
body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;
  font-family:"Noto Serif SC","Source Han Serif SC","Songti SC",serif}
@media (prefers-color-scheme:dark){html{background:#0e1116;color:#e9edf3}}
main{max-width:30em;text-align:center}
h1{font-size:1.5rem;letter-spacing:.06em;margin:0 0 .7rem}
p{font-size:.98rem;line-height:1.9;margin:.4rem 0 1.4rem;opacity:.8}
a{display:inline-block;border:1px solid currentColor;border-radius:9px;padding:11px 22px;
  color:inherit;text-decoration:none;font-size:.95rem;letter-spacing:.06em}
</style></head>
<body><main>
<h1>这一页还没离线存过</h1>
<p>网络断了。之前读过的页面仍然能打开；要整站离线，去底部「阅读」面板里开「离线全站」。</p>
<a href="./">回到首页</a>
</main></body></html>
`

// SW 源码：只用引号与拼接，避免和外层模板字面量打架
function swSource(ver) {
  return [
    "var VER = " + JSON.stringify(ver) + ";",
    'var STATIC = VER + "-static";',
    'var PAGES = VER + "-pages";',
    'var FULL = VER + "-full";',
    'var OFFLINE = VER + "-offline";',
    "var MAX_PAGES = 150;",
    "var MAX_STATIC = 90;",
    "var state = { running: false, done: 0, total: 0 };",
    "",
    "self.addEventListener('install', function () { self.skipWaiting(); });",
    "",
    "self.addEventListener('activate', function (e) {",
    "  e.waitUntil((async function () {",
    "    var keys = await caches.keys();",
    "    await Promise.all(keys.filter(function (k) { return k.indexOf(VER) !== 0; })",
    "      .map(function (k) { return caches.delete(k); }));",
    "    var off = await caches.open(OFFLINE);",
    "    if (!(await off.match('offline.html'))) { try { await off.add('offline.html'); } catch (e2) {} }",
    "    await self.clients.claim();",
    "  })());",
    "});",
    "",
    "function strip(href) { return href.split('?')[0].split('#')[0]; }",
    "",
    "function isPageUrl(u) {",
    "  if (u.pathname === '/' || u.pathname.endsWith('/')) return true;",
    "  if (u.pathname.endsWith('.html')) return true;",
    "  return !/\\.[a-z0-9]{2,5}$/i.test(u.pathname.split('/').pop() || '');",
    "}",
    "",
    "function isStatic(u) {",
    "  return u.pathname.indexOf('/static/') >= 0 ||",
    "    /\\.(css|js|mjs|png|jpg|jpeg|webp|svg|gif|woff2?|ttf|ico)$/i.test(u.pathname);",
    "}",
    "",
    "function isIndex(u) {",
    "  return /contentIndex\\.json$|encryptedContentIndex\\.json$/.test(u.pathname);",
    "}",
    "",
    "// 只存原始 clone：不重建 Response（把 content-encoding 等 header 抄到一个已解码的 body 上，",
    "// 回放时浏览器会解不开）。重复写入靠 delete+put 顶到队尾，keys() 的顺序就是 LRU 顺序。",
    "function normReq(u) { return new Request(strip(new URL(u, self.location.href).href)); }",
    "",
    "async function putOne(cache, u, copy) {",
    "  var req = normReq(u);",
    "  await cache.delete(req);",
    "  await cache.put(req, copy);",
    "}",
    "",
    "async function trim(cache, max) {",
    "  var keys = await cache.keys();",
    "  var n = keys.length - max;",
    "  for (var i = 0; i < n; i++) await cache.delete(keys[i]);",
    "}",
    "",
    "async function fromFull(req) {",
    "  var c = await caches.open(FULL);",
    "  return c.match(req, { ignoreSearch: true });",
    "}",
    "",
    "async function pageLoad(req) {",
    "  var c = await caches.open(PAGES);",
    "  try {",
    "    var res = await fetch(req);",
    "    if (res && res.ok && !res.bodyUsed) {",
    "      var copy = res.clone();",
    "      putOne(c, req.url, copy).then(function () { return trim(c, MAX_PAGES); }).catch(function () {});",
    "    }",
    "    return res;",
    "  } catch (err) {",
    "    var hit = await c.match(req, { ignoreSearch: true });",
    "    if (hit) return hit;",
    "    var full = await fromFull(req);",
    "    if (full) return full;",
    "    var off = await (await caches.open(OFFLINE)).match('offline.html');",
    "    return off || Response.error();",
    "  }",
    "}",
    "",
    "async function staleAsset(req) {",
    "  var c = await caches.open(STATIC);",
    "  var hit = await c.match(req, { ignoreSearch: true });",
    "  // 写缓存失败绝不能把成功的响应变成 error：putOne 的 rejection 单独吞掉",
    "  var bg = fetch(req).then(function (res) {",
    "    if (res && res.ok && !res.bodyUsed) {",
    "      var copy = res.clone();",
    "      putOne(c, req.url, copy).then(function () { return trim(c, MAX_STATIC); }).catch(function () {});",
    "    }",
    "    return res;",
    "  });",
    "  if (hit) { bg.catch(function () {}); return hit; }",
    "  return bg.catch(async function () {",
    "    var full = await fromFull(req);",
    "    return full || Response.error();",
    "  });",
    "}",
    "",
    "self.addEventListener('fetch', function (e) {",
    "  var req = e.request;",
    "  if (req.method !== 'GET') return;",
    "  var u = new URL(req.url);",
    "  if (u.origin !== self.location.origin) return;",
    "  if (u.pathname.endsWith('/sw.js')) return;",
    "  if (isIndex(u)) return;",
    "  if (isPageUrl(u)) { e.respondWith(pageLoad(req)); return; }",
    "  if (isStatic(u)) { e.respondWith(staleAsset(req)); return; }",
    "});",
    "",
    "function tell(msg) {",
    "  return self.clients.matchAll({ includeUncontrolled: true }).then(function (all) {",
    "    all.forEach(function (cl) { try { cl.postMessage(msg); } catch (e) {} });",
    "  });",
    "}",
    "",
    "async function precache() {",
    "  if (state.running) return;",
    "  state.running = true; state.done = 0; state.total = 0;",
    "  tell({ type: 'kb-progress', running: true, done: 0, total: 0 });",
    "  var list = [];",
    "  try { list = await (await fetch('pwa-urls.json')).json(); } catch (e) { list = []; }",
    "  var pages = list.filter(function (p) { return /\\.html$/.test(p); });",
    "  var others = list.filter(function (p) { return !/\\.html$/.test(p); });",
    "  // 离线搜索要的那份 7.4MB 索引只在全站模式下收，且放 STATIC 里不受 PAGES 的 LRU 牵连",
    "  others.push('static/contentIndex.json');",
    "  var all = pages.concat(others);",
    "  var pc = await caches.open(FULL);",
    "  var sc = await caches.open(STATIC);",
    "  state.total = all.length;",
    "  var failed = 0;",
    "  for (var i = 0; i < all.length; i++) {",
    "    try {",
    "      var res = await fetch(all[i]);",
    "      if (res && res.ok) await putOne(all[i] === 'static/contentIndex.json' ? sc : pc, all[i], res);",
    "      else failed++;",
    "    } catch (e) { failed++; }",
    "    state.done++;",
    "    if (state.done % 8 === 0 || state.done === all.length) {",
    "      tell({ type: 'kb-progress', running: true, done: state.done, total: state.total });",
    "    }",
    "  }",
    "  state.running = false;",
    "  var n = (await pc.keys()).length;",
    "  tell({ type: 'kb-progress', running: false, done: state.done, total: state.total,",
    "    failed: failed, full: n });",
    "}",
    "",
    "async function clearFull() {",
    "  await caches.delete(FULL);",
    "  await caches.open(FULL);",
    "  tell({ type: 'kb-progress', running: false, done: 0, total: 0, full: 0 });",
    "}",
    "",
    "async function fullCount() {",
    "  return (await (await caches.open(FULL)).keys()).length;",
    "}",
    "",
    "self.addEventListener('message', function (e) {",
    "  var d = e.data || {};",
    "  if (d.type === 'kb-precache') { e.waitUntil(precache()); return; }",
    "  if (d.type === 'kb-clear-full') { e.waitUntil(clearFull()); return; }",
    "  if (d.type === 'kb-ping') {",
    "    e.waitUntil(fullCount().then(function (n) {",
    "      tell({ type: 'kb-progress', running: state.running, done: state.done,",
    "        total: state.total, full: n });",
    "    }));",
    "  }",
    "});",
    "",
  ].join("\n")
}

function headScript() {
  return [
    "(function(){",
    "if(window.__kbPwa)return;window.__kbPwa=1;",
    "var st=document.createElement('style');st.id='kb-pwa-css';",
    "st.textContent='.kb-off-hint{margin:0 0 9px;font-size:.78rem;line-height:1.65;color:var(--darkgray)}'",
    "+'.kb-off .kb-btn{width:100%;height:auto;min-height:44px;padding:11px 13px;border-radius:9px;'",
    "+'font-size:.95rem;letter-spacing:.04em;display:block;margin-bottom:9px;cursor:pointer}'",
    "+'.kb-off .kb-btn[disabled]{opacity:.55}'",
    "+'.kb-off-prog{height:3px;border-radius:2px;background:var(--lightgray);overflow:hidden;margin-bottom:9px}'",
    "+'.kb-off-prog i{display:block;height:100%;background:var(--secondary);transform-origin:0 50%;'",
    "+'transform:scaleX(0);transition:transform .25s linear}';",
    "document.head.appendChild(st);",
    "var BASE=(document.body.getAttribute('data-basepath')||'')+'/';",
    "if('serviceWorker' in navigator&&location.hostname!=='localhost'){",
    "  navigator.serviceWorker.register(BASE+'sw.js',{scope:BASE}).catch(function(){});}",
    "var tc=document.querySelector('meta[name=theme-color]');",
    "function syncTc(){if(tc)tc.setAttribute('content',",
    "  document.body.classList.contains('theme-dark')?'#0e1116':'#ffffff');}",
    "if(tc){new MutationObserver(syncTc).observe(document.body,",
    "  {attributes:true,attributeFilter:['class']});syncTc();}",
    "var deferred=null,installed=false,full={running:false,done:0,total:0,full:0};",
    "function say(m){var s=navigator.serviceWorker;if(!s)return;",
    "  if(s.controller){s.controller.postMessage(m);return;}",
    "  // 首次装好 SW 的那一次加载还没有 controller（要等下次导航才接管），",
    "  // 直接走 ready→active 才不会让「离线全站」按钮在用户第一次点时静默失效",
    "  s.ready.then(function(r){if(r.active)r.active.postMessage(m);}).catch(function(){});}",
    "if(navigator.serviceWorker){navigator.serviceWorker.addEventListener('message',function(e){",
    "  var d=e.data||{};if(d.type!=='kb-progress')return;full=d;paint();});}",
    "window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferred=e;paint();});",
    "window.addEventListener('appinstalled',function(){installed=true;deferred=null;",
    "  say({type:'kb-ping'});paint();});",
    "function standalone(){return (window.matchMedia&&",
    "  window.matchMedia('(display-mode: standalone)').matches)||window.navigator.standalone===true;}",
    "function ios(){return /iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;}",
    "function el(t,c,h2){var n=document.createElement(t);if(c)n.className=c;",
    "  if(h2!==undefined)n.innerHTML=h2;return n}",
    "function build(host){",
    "  var s=el('div','kb-off');",
    "  s.appendChild(el('h4',null,'离线与安装'));",
    "  var ins=el('button','kb-btn kb-install');ins.type='button';s.appendChild(ins);",
    "  var off=el('button','kb-btn kb-offline');off.type='button';s.appendChild(off);",
    "  s.appendChild(el('div','kb-off-prog','<i></i>'));",
    "  s.appendChild(el('p','kb-off-hint'));",
    "  host.appendChild(s);host.__kbOff=s;",
    "  ins.addEventListener('click',function(){",
    "    if(deferred){deferred.prompt();deferred=null;}",
    "    else s.querySelector('.kb-off-hint').textContent=",
    "      'iPhone / iPad：点浏览器里的「分享」，再选「添加到主屏幕」。';});",
    "  off.addEventListener('click',function(){",
    "    if(full.running)return;",
    "    if(full.full>0){say({type:'kb-clear-full'});full={running:false,done:0,total:0,full:0};paint();",
    "      setTimeout(function(){say({type:'kb-ping'});},800);return;}",
    "    say({type:'kb-precache'});});",
    "  return s}",
    "var lastKey='';",
    "function paint(){",
    "  var host=document.querySelector('.kb-sheet-read');if(!host)return;",
    "  var key=[standalone(),installed,!!deferred,ios(),full.running,full.done,full.total,",
    "    full.full].join('|');",
    "  if(key===lastKey&&host.__kbOff)return;",
    "  lastKey=key;",
    "  var s=host.__kbOff||build(host);",
    "  var ins=s.querySelector('.kb-install'),off=s.querySelector('.kb-offline'),",
    "    bar=s.querySelector('.kb-off-prog i'),hint=s.querySelector('.kb-off-hint');",
    "  if(standalone()){s.style.display='none';return;}else{s.style.display='';}",
    "  if(installed){ins.style.display='';ins.textContent='已安装到主屏';ins.disabled=true;}",
    "  else if(deferred){ins.style.display='';ins.textContent='安装到主屏';ins.disabled=false;}",
    "  else if(ios()){ins.style.display='';ins.textContent='如何安装（iPhone / iPad）';",
    "    ins.disabled=false;hint.textContent='iPhone / iPad：点浏览器里的「分享」，再选「添加到主屏幕」。';}",
    "  else{ins.style.display='none';}",
    "  if(full.running){off.textContent='正在离线全站 '+full.done+' / '+full.total;",
    "    off.disabled=true;bar.style.transform='scaleX('+(full.total?full.done/full.total:0)+')';}",
    "  else if(full.full>0){off.textContent='已离线全站（'+full.full+' 项）· 点按清除';",
    "    off.disabled=false;bar.style.transform='scaleX(1)';",
    "    hint.textContent='不联网也能整站翻。清除后回到「只存读过的页面」。';}",
    "  else{off.textContent='离线全站（约 60 MB）';off.disabled=false;bar.style.transform='scaleX(0)';",
    "    hint.textContent='不点就只存你读过的页面（最多 150 篇，约 5 MB）。';}",
    "}",
    "new MutationObserver(function(){paint();}).observe(document.body,",
    "  {childList:true,subtree:true});",
    "document.addEventListener('nav',function(){lastKey='';paint();say({type:'kb-ping'});});",
    "setTimeout(function(){say({type:'kb-ping'});},400);",
    "})();",
  ].join("\n")
}

const ZhikuPwa = () => ({
  name: "ZhikuPwa",
  externalResources(ctx) {
    const colors = ctx.cfg.configuration.theme?.colors ?? {}
    const light = colors.lightMode?.light ?? "#ffffff"
    const pre = basePrefix(ctx)
    const abs = (p) => (pre + "/" + p).replace(/\/{2,}/g, "/")
    return {
      js: [{ loadTime: "afterDOMReady", contentType: "inline", script: headScript() }],
      additionalHead: [
        h("link", { rel: "manifest", href: abs("manifest.json") }),
        h("link", { rel: "apple-touch-icon", href: abs("static/pwa/apple-touch-icon.png") }),
        h("meta", { name: "application-name", content: "知库" }),
        h("meta", { name: "mobile-web-app-capable", content: "yes" }),
        h("meta", { name: "apple-mobile-web-app-capable", content: "yes" }),
        h("meta", { name: "apple-mobile-web-app-title", content: "知库" }),
        h("meta", { name: "apple-mobile-web-app-status-bar-style", content: "default" }),
        h("meta", { name: "theme-color", content: light }),
      ],
    }
  },
  async emit(ctx, content) {
    const out = []
    const slugs = []
    for (const [, vfile] of content) {
      const slug = vfile.data?.slug
      if (!slug || slug === "404") continue
      slugs.push(slug + ".html")
    }
    const icons = await makeIcons()
    out.push(await writeOut(ctx, join("static", "pwa", "icon-192.png"), icons.icon192))
    out.push(await writeOut(ctx, join("static", "pwa", "icon-512.png"), icons.icon512))
    out.push(await writeOut(ctx, join("static", "pwa", "icon-maskable-192.png"), icons.maskable192))
    out.push(await writeOut(ctx, join("static", "pwa", "icon-maskable-512.png"), icons.maskable))
    out.push(await writeOut(ctx, join("static", "pwa", "apple-touch-icon.png"), icons.apple))
    out.push(await writeOut(ctx, "manifest.json", manifestJson()))
    out.push(await writeOut(ctx, "offline.html", OFFLINE_HTML))
    out.push(await writeOut(ctx, "pwa-urls.json", JSON.stringify(slugs.concat(["manifest.json"]))))
    out.push(await writeOut(ctx, "sw.js", swSource("kb" + Date.now().toString(36))))
    return out
  },
  async *partialEmit() {},
})

export default ZhikuPwa
