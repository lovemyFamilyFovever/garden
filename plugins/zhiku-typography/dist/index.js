// 知库排版约定 → Quartz v5 本地插件（无构建步骤，直接交付 dist）
// 规则源：knowledge/static/app.js::enhanceArticleDOM + style.css L455-487
// 差异适配：正文容器 .markdown-rendered；Quartz 标题尾部自带 anchor 元素，徽章剥离只作用于最后一个文本节点
// 2026-09-20 用户视觉反馈追加：宽屏边距、Consolas、白底卡片、细滚动条、explorer 中文映射

const css = `
.markdown-rendered .sec-card{border:1px solid color-mix(in oklab,var(--gray),transparent 55%);border-radius:12px;padding:1.4rem 1.6rem;margin-bottom:1.6rem;background:#fff}
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
body.theme-dark .markdown-rendered .sec-card{background:color-mix(in oklab,var(--light),transparent 25%);border-color:color-mix(in oklab,var(--gray),transparent 60%)}
footer > p:first-child{display:none}

/* ===== 视觉反馈批次 2026-09-20 ===== */
/* 边距：宽屏放宽外框、收紧栏间距、正文左右留白 */
.page{max-width:1720px}
#quartz-body{gap:0}
.left.sidebar{padding:1rem .8rem 1rem 1.2rem}
.right.sidebar{padding:1rem 1.2rem 1rem .8rem}
article{padding:.5rem 1.8rem 1rem}
/* 白底：页面与卡片都去灰 */
body.theme-light{background:#fff}
/* 正文字体：与本地阅读器同款 Consolas 栈 */
.markdown-rendered{font-family:Consolas,"梦源黑体 CN","Microsoft YaHei",sans-serif}
/* 滚动条：4px 细条、透明轨道；面板隐藏横向条 */
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:color-mix(in oklab,var(--gray),transparent 50%);border-radius:2px}
::-webkit-scrollbar-thumb:hover{background:color-mix(in oklab,var(--gray),transparent 25%)}
*{scrollbar-width:thin;scrollbar-color:color-mix(in oklab,var(--gray),transparent 50%) transparent}
.toc-content,.explorer-content{overflow-x:hidden}
`;

const script = `(function(){
  var ZH={
    "ai-assets":"AI 资产","articles":"文章","baike":"百科","career":"求职","handbook":"手册","interview":"面试",
    "ai-and-llm":"AI 与大模型","algorithms":"算法","architecture":"架构","blockchain":"区块链","cs-basics":"计算机基础",
    "data-science":"数据科学","database":"数据库","design-patterns":"设计模式","developer-skills":"开发技能","devops":"DevOps",
    "distributed":"分布式","frontend-concepts":"前端概念","frontend-frameworks":"前端框架","graphics-multimedia":"图形多媒体",
    "hardware":"硬件","hci":"人机交互","iot":"物联网","machine-learning":"机器学习","middleware":"中间件","mobile":"移动开发",
    "network":"网络","os":"操作系统","programming-languages":"编程语言","security":"安全","software-engineering":"软件工程",
    "testing":"测试","tools":"工具","web-backend":"Web 后端",
    "ai":"AI","ai-agent":"AI Agent","behavioral":"行为面","business":"业务","css-html":"CSS/HTML","engineering":"工程化",
    "frameworks":"框架","industry":"行业","javascript":"JavaScript","management":"管理","node-fullstack":"Node 全栈",
    "performance":"性能","css":"CSS","html":"HTML","debugging":"调试","git":"Git","optimization":"优化","pinia":"Pinia",
    "tutorials":"教程"
  };
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
  function localizeExplorer(){
    var root=document.querySelector(".explorer-content");
    if(!root)return;
    root.querySelectorAll("a[href]").forEach(function(a){
      var m=(a.getAttribute("href")||"").match(/\\/([^/]+)\\/?$/);
      if(!m)return;
      var z=ZH[decodeURIComponent(m[1])];
      if(z&&a.firstChild&&a.firstChild.nodeType===3)a.firstChild.nodeValue=z;
    });
  }
  function run(){
    enhance(document.querySelector(".markdown-rendered"));
    localizeExplorer();
  }
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
