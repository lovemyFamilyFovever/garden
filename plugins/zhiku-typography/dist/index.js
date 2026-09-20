// 知库排版约定 → Quartz v5 本地插件（无构建步骤，直接交付 dist）
// 规则源：knowledge/static/app.js::enhanceArticleDOM + style.css L455-487
// 差异适配：正文容器 .markdown-rendered；Quartz 标题尾部自带 anchor 元素，徽章剥离只作用于最后一个文本节点

const css = `
.markdown-rendered .sec-card{border:1px solid color-mix(in oklab,var(--gray),transparent 55%);border-radius:12px;padding:1.4rem 1.6rem;margin-bottom:1.6rem;background:color-mix(in oklab,var(--lightgray),transparent 45%)}
.markdown-rendered h2{--bar-s:50%;--bar-l:89%;--bar-fg:#1f2937;padding:.7rem 1.1rem;border-radius:9px;border-left:4px solid var(--kb-acc);color:var(--bar-fg);background:linear-gradient(135deg,hsl(var(--gh,160) var(--bar-s) var(--bar-l)),hsl(var(--gh2,200) var(--bar-s) var(--bar-l)))}
.markdown-rendered h3{display:flex;justify-content:space-between;align-items:center;gap:.6rem;flex-wrap:wrap;border-left:4px solid var(--kb-acc);padding-left:.8rem;color:var(--kb-acc)}
.markdown-rendered .kb-badge{margin-left:auto;font-size:.72rem;font-weight:700;border:none;border-radius:20px;padding:.18rem .7rem;white-space:nowrap;font-variant-numeric:tabular-nums}
.markdown-rendered .kb-badge.b{color:var(--kb-ok);background:color-mix(in oklab,var(--kb-ok),transparent 85%)}
.markdown-rendered .kb-badge.m{color:var(--kb-warn);background:color-mix(in oklab,var(--kb-warn),transparent 85%)}
.markdown-rendered .kb-badge.a{color:var(--kb-danger);background:color-mix(in oklab,var(--kb-danger),transparent 85%)}
.markdown-rendered blockquote.kb-tip{border-left:4px solid var(--kb-info);background:color-mix(in oklab,var(--kb-info),transparent 90%)}
.markdown-rendered blockquote.kb-warn{border-left:4px solid var(--kb-warn);background:color-mix(in oklab,var(--kb-warn),transparent 90%)}
.markdown-rendered blockquote.kb-kp{border-left:4px solid var(--kb-acc);background:color-mix(in oklab,var(--kb-acc),transparent 90%)}
.markdown-rendered blockquote.kb-fu{border-left:4px solid var(--kb-fu);background:color-mix(in oklab,var(--kb-fu),transparent 90%)}
.markdown-rendered{--kb-ok:#16a34a;--kb-warn:#d97706;--kb-danger:#dc2626;--kb-info:#2563eb;--kb-fu:#7c3aed;--kb-acc:var(--secondary)}
body.theme-dark .markdown-rendered{--kb-ok:#4ade80;--kb-warn:#fbbf24;--kb-danger:#f87171;--kb-info:#60a5fa;--kb-fu:#a78bfa}
body.theme-dark .markdown-rendered h2{--bar-s:40%;--bar-l:82%}
footer > p:first-child{display:none}
`;

const script = `(function(){
  function hashHue(s){var g=0;for(var i=0;i<s.length;i++)g=(g*31+s.charCodeAt(i))>>>0;return g%360}
  function lastTextNode(el){for(var i=el.childNodes.length-1;i>=0;i--){var n=el.childNodes[i];if(n.nodeType===3&&n.nodeValue.trim())return n;if(n.nodeType===1&&n.tagName==="A")continue;if(n.nodeType===1)return null}return null}
  function enhance(root){
    if(!root||root.dataset.kbTypo==="1")return;
    root.dataset.kbTypo="1";
    var cur=null;
    Array.prototype.slice.call(root.children).forEach(function(n){
      var t=n.tagName;
      if(t==="H2"){cur=document.createElement("div");cur.className="sec-card";root.insertBefore(cur,n);cur.appendChild(n)}
      else if(t==="H1"){cur=null}
      else if(cur){cur.appendChild(n)}
    });
    root.querySelectorAll("h2").forEach(function(h){
      var g=hashHue(h.textContent||"");
      h.style.setProperty("--gh",g);
      h.style.setProperty("--gh2",(g+42)%360);
    });
    root.querySelectorAll("h3").forEach(function(h){
      if(h.querySelector(".kb-badge"))return;
      var tn=lastTextNode(h);if(!tn)return;
      var m=tn.nodeValue.match(/(.*)[｜|]\\s*(初级|中级|高级)\\s*$/);
      if(!m)return;
      tn.nodeValue=m[1].replace(/\\s+$/,"");
      var b=document.createElement("span");
      b.className="kb-badge "+(m[2]==="初级"?"b":m[2]==="中级"?"m":"a");
      b.textContent=m[2];
      h.appendChild(b);
    });
    root.querySelectorAll("blockquote").forEach(function(bq){
      var t=(bq.textContent||"").trim();
      if(/^💡/.test(t))bq.classList.add("kb-tip");
      else if(/^(?:⚠\\uFE0F?|❗)/.test(t))bq.classList.add("kb-warn");
      else if(/^🎯|^关键要点|^关键知识点/.test(t))bq.classList.add("kb-kp");
      else if(/^🔍|^追问/.test(t))bq.classList.add("kb-fu");
    });
  }
  function run(){enhance(document.querySelector(".markdown-rendered"))}
  run();
  document.addEventListener("nav",run);
})();`;

function ZhikuTypographyView() {
  return null
}
ZhikuTypographyView.css = css
ZhikuTypographyView.afterDOMLoaded = script

const ZhikuTypography = () => ZhikuTypographyView

export { ZhikuTypography }
