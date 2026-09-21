// 知库排版约定 → Quartz v5 本地插件（无构建步骤，直接交付 dist）
// 主题「纸墨·夜航」= 方案A编辑部衬线排印 × 方案B墨蓝暗色，双主题由 Quartz 颜色变量驱动
// sec-card 去盒改细规线大序号；提示框/徽章/表格走 --secondary 朱砂体系

const css = `
/* ===== 字体栈：本地衬线 + Consolas 点缀（不依赖 Google Fonts）===== */
.markdown-rendered,.explorer-content,.toc,.page-title,.breadcrumb,.backlinks a{font-family:"Noto Serif SC","Source Han Serif SC","Songti SC","STZhongsong","SimSun",serif}

/* ===== 布局与留白 ===== */
.page{max-width:1500px}
#quartz-body{gap:0}
.left.sidebar{padding:1.2rem .9rem 1rem 1.4rem;border-right:1px solid var(--gray)}
.right.sidebar{padding:1.2rem 1.4rem 1rem .9rem;border-left:1px solid var(--gray)}
article{padding:.6rem 2.2rem 2rem}
body.theme-light{background:#fff}

/* ===== 正文排印 ===== */
.markdown-rendered{color:var(--dark);font-size:16.5px;line-height:1.95;counter-reset:kbsec}
.markdown-rendered h1{font-size:2.25rem;font-weight:900;letter-spacing:.03em;line-height:1.4;border-bottom:3px double var(--gray);padding-bottom:.9rem;margin-bottom:1.6rem}
.markdown-rendered p{margin:.9rem 0;color:var(--dark)}
.markdown-rendered strong{color:var(--secondary);font-weight:900}
.markdown-rendered a{color:var(--dark);border-bottom:1px solid color-mix(in oklab,var(--secondary),transparent 45%);transition:color .2s}
.markdown-rendered a:hover{color:var(--secondary)}
.markdown-rendered li{margin:.4rem 0}
.markdown-rendered li::marker{color:var(--secondary)}
.markdown-rendered hr{border:none;border-top:1px solid var(--gray);margin:1.6rem 0}

/* ===== 章节：大衬线序号 + 规线（A 的招牌，替代旧渐变条）===== */
.markdown-rendered .sec-card{background:transparent;border:none;border-radius:0;padding:0 0 2.4rem;margin:0}
.markdown-rendered .sec-card h2{counter-increment:kbsec;display:flex;align-items:baseline;gap:1.1rem;font-size:1.32rem;font-weight:900;letter-spacing:.05em;color:var(--dark);background:none;border:none;border-bottom:2px solid var(--dark);border-radius:0;padding:0 0 .45rem;margin:0 0 1.3rem}
.markdown-rendered .sec-card h2::before{content:counter(kbsec,decimal-leading-zero);font-family:Consolas,"JetBrains Mono",monospace;font-size:1.9rem;font-weight:700;color:var(--secondary);letter-spacing:-.03em;line-height:1}
.markdown-rendered h3{display:flex;justify-content:space-between;align-items:center;gap:.6rem;flex-wrap:wrap;border-left:none;padding-left:0;color:var(--dark);font-weight:900;letter-spacing:.03em}
.markdown-rendered h4{color:var(--darkgray)}

/* ===== 难度徽章（朱砂体系微调，等宽小标）===== */
.markdown-rendered .kb-badge{margin-left:auto;font-family:Consolas,"JetBrains Mono",monospace;font-size:.7rem;font-weight:700;border:none;border-radius:3px;padding:.15rem .6rem;white-space:nowrap;letter-spacing:.08em}
.markdown-rendered .kb-badge.b{color:#1a7f4e;background:color-mix(in oklab,#1a7f4e,transparent 86%)}
.markdown-rendered .kb-badge.m{color:#b8860b;background:color-mix(in oklab,#b8860b,transparent 86%)}
.markdown-rendered .kb-badge.a{color:var(--secondary);background:color-mix(in oklab,var(--secondary),transparent 86%)}
body.theme-dark .markdown-rendered .kb-badge.b{color:#5ce0a0;background:rgba(92,224,160,.12)}
body.theme-dark .markdown-rendered .kb-badge.m{color:#f5c343;background:rgba(245,195,67,.12)}

/* ===== 提示框：纸墨眉批 ===== */
.markdown-rendered blockquote{margin:1.1rem 0;padding:.85rem 1.2rem;border:1px solid var(--gray);border-left:3px solid var(--secondary);border-radius:2px;background:var(--lightgray);color:var(--dark);font-size:.97rem}
.markdown-rendered blockquote.kb-tip{border-left-color:var(--tertiary)}
.markdown-rendered blockquote.kb-warn{border-left-color:#d40000;background:color-mix(in oklab,#d40000,var(--light),96%)}
body.theme-dark .markdown-rendered blockquote.kb-warn{background:rgba(255,90,90,.06)}
.markdown-rendered blockquote.kb-kp{position:relative;padding-left:2.8rem;border-left:none;border-color:color-mix(in oklab,var(--secondary),transparent 55%)}
.markdown-rendered blockquote.kb-kp::before{content:"〝";position:absolute;left:.9rem;top:.15rem;font-size:2.4rem;line-height:1;color:var(--secondary);font-family:Georgia,serif}
.markdown-rendered blockquote.kb-fu{background:transparent;border-style:dashed;border-left:3px dashed var(--darkgray);color:var(--darkgray)}

/* ===== 表格：报头规线 ===== */
.markdown-rendered table{border-collapse:collapse;width:100%;margin:1.3rem 0;font-size:.93rem}
.markdown-rendered th{border-top:2px solid var(--dark);border-bottom:1px solid var(--dark);padding:.55rem .8rem;text-align:left;font-size:.78rem;letter-spacing:.15em;color:var(--darkgray)}
.markdown-rendered td{padding:.55rem .8rem;border-bottom:1px solid var(--gray)}
.markdown-rendered tr:last-child td{border-bottom:2px solid var(--dark)}

/* ===== 代码块：等宽 + 细边 ===== */
.markdown-rendered pre{border:1px solid var(--gray);border-radius:3px}
.markdown-rendered code{font-family:Consolas,"JetBrains Mono",monospace}

/* ===== 侧栏：树与目录的纸墨化 ===== */
.explorer-content{font-size:.86rem}
.explorer-content .folder-title,.explorer-content li a{color:var(--darkgray)}
.explorer-content a:hover,.explorer-content button:hover .folder-title{color:var(--dark)}
.toc-content.overflow>li>a{color:var(--darkgray);border-bottom:1px dotted var(--gray);opacity:.9}
.toc-content.overflow>li>a.in-view{color:var(--secondary);opacity:1}
.page-title{letter-spacing:.12em;font-weight:900}

/* ===== 滚动条：4px 细条 ===== */
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:color-mix(in oklab,var(--gray),transparent 30%);border-radius:2px}
*{scrollbar-width:thin;scrollbar-color:color-mix(in oklab,var(--gray),transparent 30%) transparent}
.toc-content,.explorer-content{overflow-x:hidden}

/* ===== 页脚 ===== */
footer > p:first-child{display:none}
footer ul li a{font-family:Consolas,monospace;font-size:.72rem;letter-spacing:.15em;color:var(--darkgray)}
footer ul li a:hover{color:var(--secondary)}

/* ===== 移动端 ===== */
@media (max-width:880px){
  article{padding:.4rem 1.1rem 2rem}
  .markdown-rendered h1{font-size:1.7rem}
  .markdown-rendered .sec-card h2{font-size:1.15rem;gap:.8rem}
  .markdown-rendered .sec-card h2::before{font-size:1.4rem}
  .left.sidebar,.right.sidebar{border:none}
}
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
    root.querySelectorAll(".folder-title").forEach(function(s){
      var z=ZH[s.textContent.trim()];
      if(z)s.textContent=z;
    });
  }
  var explorerMO=null;
  function watchExplorer(){
    var root=document.querySelector(".explorer-content");
    if(!root)return;
    localizeExplorer();
    if(explorerMO&&explorerMO._t===root)return;
    if(explorerMO)explorerMO.disconnect();
    explorerMO=new MutationObserver(function(){localizeExplorer()});
    explorerMO.observe(root,{subtree:true,childList:true,characterData:true});
    explorerMO._t=root;
  }
  function run(){
    enhance(document.querySelector(".markdown-rendered"));
    watchExplorer();
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
