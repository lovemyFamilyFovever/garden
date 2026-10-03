// 知库排版约定 → Quartz v5 本地插件（无构建步骤，直接交付 dist）
// 主题「纸墨·夜航」= 方案A编辑部衬线排印 × 方案B墨蓝暗色，双主题由 Quartz 颜色变量驱动
// sec-card 去盒改细规线大序号；提示框/徽章/表格走 --secondary 朱砂体系

const css = `
/* ===== 字体栈：本地衬线 + Consolas 点缀（不依赖 Google Fonts）===== */
.markdown-rendered,.explorer-content,.toc,.page-title,.breadcrumb,.backlinks a{font-family:"Noto Serif SC","Source Han Serif SC","Songti SC","STZhongsong","SimSun",serif}

/* ===== 布局与留白 ===== */
.page{max-width:1500px}
#quartz-body{gap:0}
.left.sidebar{padding:1.2rem .9rem 1rem 1.4rem}
.right.sidebar{padding:1.2rem 1.4rem 1rem .9rem}
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

/* ===== 左栏顶部：极简全局搜索（常驻输入框 + 下拉结果）=====
   原生 search 组件是「按钮 + fixed 全屏浮层」，这里拍平成栏内的常驻输入框：
   .search-container 改为静态常显，.search-layout 变成输入框正下方的下拉。
   作用域限定在 .left.sidebar，特异性天然高于原生选择器，无需到处 !important。 */
.left.sidebar{--kb-mag:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round'%3E%3Ccircle cx='11' cy='11' r='6.6'/%3E%3Cpath d='m20 20-3.4-3.4'/%3E%3C/svg%3E")}
.left.sidebar .search{min-width:0;max-width:none;margin:0 0 12px}
.left.sidebar .search>.search-button{display:none!important}
.left.sidebar .search>.search-container{display:block!important;position:relative!important;
  left:auto!important;top:auto!important;width:auto!important;height:auto!important;
  overflow:visible!important;contain:none!important;z-index:auto!important;
  background:none!important;backdrop-filter:none!important}
.left.sidebar .search>.search-container>.search-space{width:100%!important;margin:0!important;
  position:relative}
.left.sidebar .search>.search-container>.search-space::before{content:"";position:absolute;
  left:11px;top:50%;width:15px;height:15px;margin-top:-7.5px;pointer-events:none;z-index:1;
  background-color:var(--darkgray);opacity:.6;
  -webkit-mask:var(--kb-mag) no-repeat center/contain;
  mask:var(--kb-mag) no-repeat center/contain}
.left.sidebar .search>.search-container>.search-space>.search-bar{box-sizing:border-box;
  width:100%;height:36px;padding:0 10px 0 34px;border:1px solid var(--gray);border-radius:9px;
  background:var(--lightgray);color:var(--dark);font-family:inherit;font-size:.88rem;
  transition:border-color .16s,background-color .16s}
.left.sidebar .search>.search-container>.search-space>.search-bar:hover{border-color:var(--darkgray)}
.left.sidebar .search>.search-container>.search-space>.search-bar:focus{outline:none;
  border-color:var(--secondary);background:var(--light);
  box-shadow:0 0 0 3px color-mix(in oklab,var(--secondary),transparent 90%)}
.left.sidebar .search>.search-container>.search-space>.ghost-text{padding-left:34px;
  font-size:.88rem;color:var(--gray)}
.left.sidebar .search>.search-container>.search-space>.search-layout{position:absolute;left:0;
  right:0;top:calc(100% + 6px);width:auto;max-height:min(62vh,430px);overflow-y:auto;
  overscroll-behavior:contain;display:none;border:1px solid var(--gray);border-radius:12px;
  background:var(--light);box-shadow:0 16px 40px rgba(10,12,15,.16);z-index:80}
.left.sidebar .search>.search-container>.search-space>.search-layout.display-results{
  display:block;animation:kbDrop .16s cubic-bezier(.2,.9,.2,1)}
@keyframes kbDrop{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
.left.sidebar .search>.search-container>.search-space>.search-layout>*{height:auto!important;
  width:100%!important;border:0!important;border-radius:0!important}
.left.sidebar .search .preview-container{display:none!important}
.left.sidebar .search>.search-container>.search-space>.search-layout>.results-container>.result-card{
  display:block;box-sizing:border-box;padding:9px 12px;text-decoration:none;color:var(--dark);
  border-bottom:1px solid color-mix(in oklab,var(--gray),transparent 55%)}
.left.sidebar .search>.search-container>.search-space>.search-layout>.results-container>.result-card:last-child{
  border-bottom:0}
.left.sidebar .search>.search-container>.search-space>.search-layout>.results-container>.result-card:hover,
.left.sidebar .search>.search-container>.search-space>.search-layout>.results-container>.result-card.focus{
  background:var(--lightgray);box-shadow:inset 2px 0 0 var(--secondary)}
.left.sidebar .search .search-layout .highlight{background:color-mix(in oklab,var(--tertiary),
  transparent 72%);color:inherit;border-radius:3px;padding:0 1px}
.left.sidebar .search .result-card.no-match{text-align:center;padding:20px 12px;border-bottom:0}
.left.sidebar .search .result-card>.card-title{margin:0;font-size:.9rem;font-weight:600;
  color:var(--dark);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.left.sidebar .search .result-card>.card-description{margin:3px 0 0;font-size:.78rem;
  line-height:1.5;color:var(--darkgray);display:-webkit-box;-webkit-line-clamp:2;
  -webkit-box-orient:vertical;overflow:hidden}
.left.sidebar .search .result-card>ul.tags{margin:5px 0 0;padding:0;list-style:none}
.left.sidebar .search .result-card>ul.tags>li{display:inline-block;margin-right:5px}
.left.sidebar .search .result-card>ul.tags>li>p{margin:0;font-size:.72rem;
  color:var(--secondary)}
.left.sidebar .search>.search-container>.search-space:focus-within::before{
  background-color:var(--secondary);opacity:.9}
.left.sidebar .search>.search-container>.search-space>.search-bar::placeholder{
  color:var(--darkgray);opacity:.6}
.left.sidebar .search .result-card:hover>.card-title,
.left.sidebar .search .result-card.focus>.card-title{color:var(--secondary)}
.left.sidebar .search .result-card.no-match>h3{font-size:.92rem;color:var(--dark)}
.left.sidebar .search .result-card.no-match>p{font-size:.8rem;color:var(--darkgray);
  margin-top:4px}
.left.sidebar .search .search-layout{scrollbar-width:thin;
  scrollbar-color:color-mix(in oklab,var(--gray),transparent 25%) transparent}
.left.sidebar .search .search-layout::-webkit-scrollbar{width:8px}
.left.sidebar .search .search-layout::-webkit-scrollbar-thumb{
  background:color-mix(in oklab,var(--gray),transparent 25%);border-radius:4px;
  border:2px solid transparent;background-clip:content-box}
`;
const mobileCss = `
/* ================= 移动端壳（V2 底部导航 + V3 抽屉 + V5 纸感 + V6 搜索 + V8 磁贴）
   全部收在这一个媒体查询里：桌面端一行都不受影响。 ================= */
@media (max-width:820px){
  :root{--kb-tab:58px;--kb-top:46px;--kb-sh:calc(var(--kb-top) + env(safe-area-inset-top))}
  html{-webkit-text-size-adjust:100%}
  /* overflow-x 必须用 clip 不能用 hidden：hidden 会把 body 变成滚动容器，
     里面的 position:fixed（抽屉）与 sticky（表头）会改成相对 body 定位，直接错位。 */
  body{overflow-x:clip}
  #quartz-body{display:block;padding-bottom:calc(var(--kb-tab) + env(safe-area-inset-bottom) + 6px)}
  .page{max-width:none}
  /* 左栏在移动端只是抽屉与搜索浮层的宿主：sticky 会造出层叠上下文，
     把 z-index:64 的抽屉压在 z-index:50 的表头下面。改 static 让它们回到根上下文。
     注意 .left.sidebar 是 grid item，z-index:1 即使 static 也生效，必须一起清掉。 */
  .left.sidebar{padding:0;width:auto;position:static!important;z-index:auto!important}
  .right.sidebar{display:none}
  /* Quartz 自带的那排控件与桌面标题交给我们注入的壳。
     注意 .flex-component 不能整块 display:none —— 搜索浮层 .search-container 就住在它里面，
     父级无盒子会让 fixed 浮层塌成 0×0；只隐藏不需要的按钮本身。
     插件 CSS 在 Quartz 组件 CSS 之前加载（第 6/21 个 stylesheet），同特异性会输，故用 !important。 */
  .left.sidebar>.flex-component{display:block!important;margin:0!important;padding:0!important}
  .left.sidebar>.flex-component>div{margin:0!important;padding:0!important}
  .flex-component .darkmode,.flex-component .readermode,.flex-component .search-button{display:none!important}
  .left.sidebar>.page-title,.mobile-only{display:none!important}

  /* --- 页头瘦身：面包屑/属性折叠/重复大标题都交给顶栏 --- */
  .page-header .breadcrumb-container{display:none}
  .page-header details.note-properties{display:none}
  .page-header h1.article-title{display:none}
  .page-header p.content-meta{margin:0 0 2px;font-size:.78rem;letter-spacing:.04em;
    color:var(--darkgray);opacity:.85}
  body[data-slug="index"] .page-header p.content-meta{display:none}

  /* --- 抽屉：现有 .explorer 直接改造成 off-canvas，不搬 DOM ---
     Quartz 给移动端正牌 explorer 定了 flex:0 0 34px + 负 margin + collapsed 绝对定位那一套，
      specificity 压不过，所以这里对该组件的几何属性用 !important 整体接管（仅移动端生效）。 */
  .explorer{position:fixed!important;top:0!important;left:0!important;bottom:auto!important;
    height:100dvh!important;width:min(86vw,330px)!important;max-width:none!important;
    margin:0!important;flex:none!important;box-sizing:border-box!important;z-index:64;
    background:var(--light);border-right:1px solid var(--gray);border-radius:0;
    padding:calc(var(--kb-sh) + 6px) 0 calc(env(safe-area-inset-bottom) + 14px)!important;
    transform:translateX(-104%);transition:transform .34s cubic-bezier(.22,.9,.18,1);
    box-shadow:none;overflow:hidden;display:flex;flex-direction:column}
  .explorer::before{content:"目录";display:block;flex:none;padding:0 14px 9px;font-size:.7rem;
    letter-spacing:.22em;color:var(--darkgray)}
  body[data-kb-drawer="1"] .explorer{transform:none;box-shadow:18px 0 46px rgba(10,12,15,.24)}
  .explorer>.explorer-toggle{display:none!important}
  .explorer-content{position:static!important;inset:auto!important;visibility:visible!important;
    opacity:1!important;transform:none!important;display:block!important;width:auto!important;
    height:auto!important;max-height:none!important;margin:0!important;padding:0 12px!important;
    flex:1 1 auto;min-height:0;overflow-y:auto;-webkit-overflow-scrolling:touch}
  .explorer .folder-title,.explorer li a{min-height:42px;display:flex;align-items:center}
  .explorer .folder-title{font-size:1rem}
  .explorer li.active>.folder-title,.explorer a.active{color:var(--secondary)}
  .explorer svg{flex:none}


  /* --- 章节 sheet：内容由脚本从正文 h2/h3 现建（Quartz 移动端正栏根本不渲染 TOC） --- */
  .kb-sheet-toc{position:fixed;left:0;right:0;bottom:calc(var(--kb-tab) + env(safe-area-inset-bottom));
    z-index:62;max-height:60vh;overflow:hidden;
    display:flex;flex-direction:column;background:var(--light);border-top:1px solid var(--gray);
    border-radius:16px 16px 0 0;padding:0 18px 16px;
    transform:translateY(calc(100% + var(--kb-tab) + env(safe-area-inset-bottom)));transition:transform .36s cubic-bezier(.2,.9,.2,1);
    box-shadow:0 -16px 40px rgba(10,12,15,.18)}
  body[data-kb-toc="1"] .kb-sheet-toc{transform:none}
  .kb-grab{width:38px;height:4px;border-radius:2px;background:var(--gray);margin:9px auto 4px;flex:none}
  .kb-sheet-toc h4{margin:2px 0 6px;font-size:.7rem;letter-spacing:.2em;color:var(--darkgray);flex:none}
  .kb-toc-list{overflow-y:auto;-webkit-overflow-scrolling:touch;padding-bottom:4px}
  .kb-toc-list a{display:block;padding:11px 0;font-size:1rem;color:var(--dark);text-decoration:none;
    border-bottom:1px solid color-mix(in oklab,var(--gray),transparent 45%)}
  .kb-toc-list a[data-lv="3"]{padding-left:16px;font-size:.92rem;color:var(--darkgray)}
  .kb-toc-list a:active{color:var(--secondary)}
  .kb-toc-list a.in-view{color:var(--secondary)}


  /* --- 阅读面板 --- */
  .kb-sheet-read{position:fixed;left:0;right:0;bottom:calc(var(--kb-tab) + env(safe-area-inset-bottom));
    z-index:62;overflow-y:auto;max-height:70vh;
    background:var(--light);border-top:1px solid var(--gray);border-radius:16px 16px 0 0;
    padding:0 18px 18px;transform:translateY(calc(100% + var(--kb-tab) + env(safe-area-inset-bottom)));
    transition:transform .36s cubic-bezier(.2,.9,.2,1);box-shadow:0 -16px 40px rgba(10,12,15,.18)}
  body[data-kb-read="1"] .kb-sheet-read{transform:none}
  .kb-sheet-read h4{margin:0 0 9px;font-size:.7rem;letter-spacing:.2em;color:var(--darkgray)}
  .kb-seg{display:flex;gap:7px;margin-bottom:15px}
  .kb-seg button{flex:1;min-height:44px;border:1px solid var(--gray);background:var(--light);
    border-radius:9px;color:var(--dark);font-family:inherit;font-size:.95rem;cursor:pointer;
    transition:.18s}
  .kb-seg button[aria-pressed="true"]{background:var(--dark);color:var(--light);border-color:var(--dark)}

  .kb-veil{position:fixed;inset:0;z-index:54;background:rgba(10,12,15,.44);opacity:0;
    pointer-events:none;transition:opacity .3s;backdrop-filter:blur(1px)}
  body[data-kb-drawer="1"] .kb-veil,body[data-kb-toc="1"] .kb-veil,
  body[data-kb-read="1"] .kb-veil{opacity:1;pointer-events:auto}

  /* --- 顶栏：整个壳 sticky，滚动时表头与进度条一起钉住 --- */
  #kb-shell{position:sticky;top:0;z-index:50;background:var(--light);
    border-bottom:1px solid var(--gray)}
  /* 浮层域单独挂到 body 下：display:contents 不生成盒子，所以 tab/遮罩/sheet
     与抽屉、搜索浮层同处根层叠上下文，遮罩才能盖住表头。 */
  #kb-over{display:contents}
  .kb-top{display:flex;align-items:center;gap:8px;height:var(--kb-top);
    padding:env(safe-area-inset-top) 12px 0}
  .kb-top .kb-t{flex:1;min-width:0;font-size:1rem;font-weight:700;letter-spacing:.01em;
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--dark)}
  .kb-btn{width:36px;height:36px;flex:none;display:grid;place-items:center;border:1px solid var(--gray);
    border-radius:10px;background:var(--light);color:var(--dark);font-family:inherit;font-size:1rem;
    cursor:pointer;transition:transform .14s,background .18s}
  .kb-btn:active{transform:scale(.92);background:var(--lightgray)}
  .kb-btn svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.7;
    stroke-linecap:round;stroke-linejoin:round}
  .kb-prog{height:2px;background:color-mix(in oklab,var(--gray),transparent 30%);margin-top:-1px}
  .kb-prog i{display:block;height:100%;background:var(--secondary);transform-origin:0 50%;
    transform:scaleX(0);transition:transform .12s linear}

  /* --- 底部导航 --- */
  .kb-tabs{position:fixed;left:0;right:0;bottom:0;z-index:56;display:flex;
    height:calc(var(--kb-tab) + env(safe-area-inset-bottom));padding-bottom:env(safe-area-inset-bottom);
    background:color-mix(in oklab,var(--light),transparent 4%);backdrop-filter:blur(14px);
    border-top:1px solid var(--gray)}
  .kb-tabs button,.kb-tabs a{flex:1;display:flex;flex-direction:column;align-items:center;
    justify-content:center;gap:3px;border:0;background:none;color:var(--darkgray);font-family:inherit;
    font-size:.64rem;letter-spacing:.08em;text-decoration:none;cursor:pointer;position:relative;
    transition:color .2s}
  .kb-tabs svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.6;
    stroke-linecap:round;stroke-linejoin:round}
  .kb-tabs [aria-current="page"],.kb-tabs [aria-selected="true"]{color:var(--secondary)}
  .kb-tabs [aria-selected="true"]::before{content:"";position:absolute;top:-1px;left:22%;right:22%;
    height:2.5px;border-radius:2px;background:var(--secondary);animation:kbSlide .28s cubic-bezier(.2,.9,.2,1)}
  @keyframes kbSlide{from{transform:translateX(-40%) scaleX(.3);opacity:0}to{transform:none;opacity:1}}

  /* --- 搜索：移动端左栏就顶在文档流最上面（sticky 顶栏之下），
     这里只补间距与触控尺寸，外观与桌面端共用全局那套。 --- */
  .left.sidebar .search{margin:8px 12px 10px}
  .left.sidebar .search>.search-container>.search-space>.search-bar{height:42px;font-size:.95rem}
  .left.sidebar .search>.search-container>.search-space>.search-layout{max-height:52vh}
  .left.sidebar .search .result-card{padding:11px 12px}


  /* --- V5 纸感排版 --- */
  article{padding:6px 21px 44px}
  .markdown-rendered{font-size:var(--kb-fs,19px);line-height:var(--kb-lh,1.95);text-align:justify;
    hyphens:auto}
  .markdown-rendered h1{font-size:1.72rem;line-height:1.34;margin:1rem 0 .7rem;border-bottom-width:2px;
    padding-bottom:.6rem}
  .markdown-rendered p{margin:.85rem 0}
  .markdown-rendered .sec-card{padding-bottom:1.7rem}
  .markdown-rendered .sec-card h2{font-size:1.16rem;gap:.7rem;margin-bottom:.9rem}
  .markdown-rendered .sec-card h2::before{font-size:1.42rem}
  .markdown-rendered h3{font-size:1.04rem}
  .markdown-rendered blockquote{padding:.8rem 1rem;font-size:.94em}
  .markdown-rendered blockquote.kb-kp{padding-left:2.3rem}
  .markdown-rendered table{display:block;overflow-x:auto;white-space:nowrap;font-size:.86em;
    border:1px solid var(--gray);border-radius:6px;padding:0 4px}
  .markdown-rendered pre{font-size:.8em;padding:12px 13px;border-radius:6px}
  .markdown-rendered :not(pre)>code{font-size:.84em}
  .markdown-rendered img{max-width:100%;height:auto}
  .markdown-rendered .backlinks-section,.backlinks{margin-top:2rem}
  .markdown-rendered>ol>li,.markdown-rendered>ul>li{font-size:.94em}
  /* 首段首字下沉：纸感招牌（首页磁贴不参与，见下方 :not([data-slug="index"])） */
  body:not([data-slug="index"]) .markdown-rendered>p:first-of-type::first-letter{float:left;
    font-size:2.5em;line-height:.84;padding:.06em .12em 0 0;color:var(--secondary);font-weight:900}
  @keyframes kbRise{from{opacity:0;transform:translateY(13px)}to{opacity:1;transform:none}}
  .markdown-rendered .sec-card{animation:kbRise .5s cubic-bezier(.2,.8,.2,1) both}
  .markdown-rendered .sec-card:nth-of-type(2){animation-delay:.07s}
  .markdown-rendered .sec-card:nth-of-type(3){animation-delay:.14s}
  .markdown-rendered .sec-card:nth-of-type(4){animation-delay:.21s}
  @media (prefers-reduced-motion:reduce){
    .explorer,.kb-sheet-toc,.kb-sheet-read,.kb-veil,.kb-prog i,.kb-tabs [aria-selected="true"]::before,
    .search-container,.markdown-rendered .sec-card{animation:none!important;transition:none!important}
  }

  /* --- V8 首页磁贴 --- */
  body[data-slug="index"] article{padding:14px 16px 30px}
  body[data-slug="index"] .markdown-rendered{text-align:left}
  body[data-slug="index"] .markdown-rendered>ul:first-child,
  body[data-slug="index"] .markdown-rendered>p+.ul-list,
  body[data-slug="index"] .markdown-rendered ul{list-style:none;margin:0;padding:0;
    display:grid;grid-template-columns:1fr 1fr;gap:11px}
  body[data-slug="index"] .markdown-rendered ul>li{display:block}
  body[data-slug="index"] .markdown-rendered ul>li:first-child{grid-column:1/-1}
  body[data-slug="index"] .markdown-rendered ul a{display:flex;align-items:center;
    justify-content:space-between;gap:10px;min-height:56px;padding:15px 15px;
    border:1px solid var(--gray);border-radius:12px;background:var(--light);color:var(--dark);
    text-decoration:none;font-size:1.02rem;font-weight:700;letter-spacing:.02em;
    transition:transform .16s,background .2s;animation:kbPop .46s cubic-bezier(.2,.8,.2,1) both}
  body[data-slug="index"] .markdown-rendered ul a::after{content:"›";flex:none;font-size:1.25rem;
    line-height:1;color:var(--darkgray);font-weight:400}
  body[data-slug="index"] .markdown-rendered ul a:active{transform:scale(.975);background:var(--lightgray)}
  body[data-slug="index"] .markdown-rendered ul li:nth-child(2) a{animation-delay:.05s}
  body[data-slug="index"] .markdown-rendered ul li:nth-child(3) a{animation-delay:.1s}
  body[data-slug="index"] .markdown-rendered ul li:nth-child(4) a{animation-delay:.15s}
  body[data-slug="index"] .markdown-rendered ul li:nth-child(5) a{animation-delay:.2s}
  body[data-slug="index"] .markdown-rendered ul li:nth-child(6) a{animation-delay:.25s}
  @keyframes kbPop{from{opacity:0;transform:translateY(14px) scale(.975)}to{opacity:1;transform:none}}
  body[data-slug="index"] .markdown-rendered>p:not(:first-of-type){color:var(--darkgray);font-size:.9rem;
    margin:2px 0 14px;letter-spacing:.02em}
}

html.kb-lock{overflow:hidden}
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
const mobileScript = `
(function(){
  var M=window.matchMedia('(max-width:820px)');
  var SV=" fill='none' stroke='currentColor' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'>";
  var IC={
    home:"<svg viewBox='0 0 24 24'"+SV+"<path d='M3.5 9.8 12 3.4l8.5 6.4V20a.9.9 0 0 1-.9.9h-4.9v-6.1H9.3v6.1H4.4a.9.9 0 0 1-.9-.9z'/></svg>",
    tree:"<svg viewBox='0 0 24 24'"+SV+"<path d='M3.5 6.6a1.6 1.6 0 0 1 1.6-1.6h3.6l2 2.2h8.2a1.6 1.6 0 0 1 1.6 1.6v8.6a1.6 1.6 0 0 1-1.6 1.6H5.1a1.6 1.6 0 0 1-1.6-1.6z'/></svg>",
    toc:"<svg viewBox='0 0 24 24'"+SV+"<path d='M8.6 6.2h11.9M8.6 12h11.9M8.6 17.8h11.9M4.1 6.2h.02M4.1 12h.02M4.1 17.8h.02'/></svg>",
    read:"<svg viewBox='0 0 24 24'"+SV+"<path d='M3.2 19.4 8.1 5.2l4.9 14.2M4.9 14.6h6.4M15.4 19.4l2.6-7.1 2.6 7.1M16.3 17h3.4'/></svg>",
    back:"<svg viewBox='0 0 24 24' stroke-width='1.9'><path d='M14.5 5.5 8 12l6.5 6.5'/></svg>",
    sun:"<svg viewBox='0 0 24 24' stroke-width='1.7'><circle cx='12' cy='12' r='4.1'/><path d='M12 2.6v2.1M12 19.3v2.1M4.5 4.5l1.5 1.5M18 18l1.5 1.5M2.6 12h2.1M19.3 12h2.1M4.5 19.5 6 18M18 6l1.5-1.5'/></svg>",
    moon:"<svg viewBox='0 0 24 24' stroke-width='1.7'><path d='M20.4 14.6A8.7 8.7 0 0 1 9.4 3.6a8.8 8.8 0 1 0 11 11z'/></svg>",
    search:"<svg viewBox='0 0 24 24' stroke-width='1.9'><circle cx='10.8' cy='10.8' r='6.4'/><path d='m15.6 15.6 4.3 4.3'/></svg>"
  };
  var TABS=[{k:'home',ic:IC.home,t:'首页'},{k:'tree',ic:IC.tree,t:'目录'},
            {k:'toc',ic:IC.toc,t:'章节'},{k:'read',ic:IC.read,t:'阅读'}];
  var FS=[['小','17px'],['标准','19px'],['大','21.5px']];
  var LH=[['松','2.1'],['标准','1.95'],['密','1.8']];
  function el(tag,cls,html){var n=document.createElement(tag);if(cls)n.className=cls;
    if(html!==undefined)n.innerHTML=html;return n}
  function base(){return document.body.getAttribute('data-basepath')||'/'}
  function title(){
    var h=document.querySelector('article h1');
    if(h&&h.textContent.trim())return h.textContent.trim();
    var p=document.querySelector('.page-header h1');
    if(p&&p.textContent.trim())return p.textContent.trim();
    return document.title.split('|')[0].trim()||'知库';
  }
  function heads(){return [].slice.call(
    document.querySelectorAll('article .markdown-rendered h2, article .markdown-rendered h3'))}
  function drawer(open){var ex=document.querySelector('.explorer');
    if(!ex)return;ex.classList[open?'remove':'add']('collapsed')}
  function close(){var b=document.body;
    b.removeAttribute('data-kb-drawer');b.removeAttribute('data-kb-toc');b.removeAttribute('data-kb-read');
    var sc=document.querySelector('.search-container');if(sc)sc.classList.remove('active');
    if(M.matches)drawer(false);
    document.documentElement.classList.remove('kb-lock')}
  function isOpen(){var b=document.body;
    return b.getAttribute('data-kb-drawer')==='1'||b.getAttribute('data-kb-toc')==='1'||
      b.getAttribute('data-kb-read')==='1'}
  function seg(items,cur,cb){
    var box=el('div','kb-seg');
    items.forEach(function(it,i){
      var b=el('button',null,it[0]);b.type='button';
      b.setAttribute('aria-pressed',cur()===i?'true':'false');
      b.addEventListener('click',function(){
        box.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed','false')});
        b.setAttribute('aria-pressed','true');cb(i);});
      box.appendChild(b);});
    return box}
  function purge(){['kb-shell','kb-over'].forEach(function(i){var n=document.getElementById(i);
    if(n)n.remove()})}
  function build(){
    close();
    purge();
    if(!M.matches)return;
    var slug=document.body.getAttribute('data-slug')||'';
    var hs=heads();
    var sh=el('div');sh.id='kb-shell';
    /* 顶栏 */
    var top=el('div','kb-top');
    var back=el('button','kb-btn',IC.back);back.type='button';back.setAttribute('aria-label','返回上级');
    back.addEventListener('click',function(){
      var pa=location.pathname;while(pa.length>1&&pa.charAt(pa.length-1)==='/')pa=pa.slice(0,-1);
      var segs=pa.split('/');
      location.href=(segs.length>2?segs.slice(0,-1).join('/'):base())+'/';});
    var t=el('span','kb-t');t.textContent=title();
    var th=el('button','kb-btn',IC.moon);th.type='button';th.setAttribute('aria-label','切换明暗');
    th.addEventListener('click',function(){var x=document.querySelector('.darkmode');
      if(x)x.click();});
    if(slug!=='index')top.appendChild(back);
    top.appendChild(t);top.appendChild(th);
    var prog=el('div','kb-prog','<i></i>');
    /* 底部导航（V2）：本页无章节时不渲染「章节」钮，避免点了空面板 */
    var tabs=el('nav','kb-tabs');tabs.setAttribute('role','tablist');
    TABS.forEach(function(x){
      if(x.k==='toc'&&hs.length<2)return;
      var b;
      if(x.k==='home'){b=el('a',null,x.ic+'<span>'+x.t+'</span>');b.href=base()+'/';
        if(slug==='index')b.setAttribute('aria-current','page');}
      else{b=el('button',null,x.ic+'<span>'+x.t+'</span>');b.type='button';
        b.setAttribute('aria-selected','false');
        b.setAttribute('aria-label',x.t);
        b.addEventListener('click',function(){
          var attr='data-kb-'+(x.k==='tree'?'drawer':x.k==='toc'?'toc':'read');
          var on=document.body.getAttribute(attr)==='1';
          close();
          if(!on){document.body.setAttribute(attr,'1');
            if(x.k==='tree')drawer(true);
            document.documentElement.classList.add('kb-lock');
            b.setAttribute('aria-selected','true');}
        });}
      tabs.appendChild(b);});
    /* 遮罩 + 章节 sheet + 阅读 sheet */
    var veil=el('div','kb-veil');veil.addEventListener('click',close);
    var tocS=el('section','kb-sheet-toc','<div class="kb-grab"></div><h4>本页章节</h4>');
    var list=el('div','kb-toc-list');
    hs.forEach(function(h){
      if(!h.id)h.id='kb-h-'+h.textContent.trim().slice(0,12).replace(/\\s+/g,'-');
      var a=el('a',null,h.textContent.replace(/\\s+/g,' ').trim());
      a.href='#'+h.id;a.setAttribute('data-lv',h.tagName.charAt(1));
      a.addEventListener('click',function(){setTimeout(close,60)});
      list.appendChild(a);});
    tocS.appendChild(list);
    var readS=el('section','kb-sheet-read','<div class="kb-grab"></div><h4>字号</h4>');
    var cur=parseInt(localStorage.getItem('kb-fs')||'1',10);
    var curL=parseInt(localStorage.getItem('kb-lh')||'1',10);
    function apply(){var r=document.documentElement;
      r.style.setProperty('--kb-fs',FS[cur][1]);r.style.setProperty('--kb-lh',LH[curL][1]);}
    apply();
    readS.appendChild(seg(FS,function(){return cur},function(i){cur=i;
      localStorage.setItem('kb-fs',i);apply()}));
    readS.appendChild(el('h4',null,'行距'));
    readS.appendChild(seg(LH,function(){return curL},function(i){curL=i;
      localStorage.setItem('kb-lh',i);apply()}));
    readS.appendChild(el('h4',null,'主题'));
    var tb=el('button','kb-btn','切换明暗');tb.type='button';tb.style.width='100%';
    tb.addEventListener('click',function(){var x=document.querySelector('.darkmode');if(x)x.click()});
    readS.appendChild(tb);
    sh.appendChild(top);sh.appendChild(prog);
    var ov=el('div');ov.id='kb-over';
    ov.appendChild(tabs);ov.appendChild(veil);ov.appendChild(tocS);ov.appendChild(readS);
    document.body.insertBefore(sh,document.body.firstChild);
    document.body.appendChild(ov);
    /* 滚动进度 */
    var bar=prog.firstChild,raf=0;
    window.addEventListener('scroll',function(){
      if(raf)return;raf=requestAnimationFrame(function(){raf=0;
        var h=document.documentElement.scrollHeight-window.innerHeight;
        bar.style.transform='scaleX('+(h>0?Math.min(1,window.scrollY/h):0)+')';});},{passive:true});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  }
  function run(){if(M.matches)build();else{
    purge();document.documentElement.classList.remove('kb-lock');}}
  run();
  document.addEventListener('nav',run);
  var mq=function(){run()};
  if(M.addEventListener)M.addEventListener('change',mq);
})();
`;


const deskCss = `
/* ============ 桌面骨架对齐（只在 ≥821px 生效，与 max-width:820px 那套移动壳互斥）
   目标 = 主仓 workbench：全宽顶栏 + 280/1fr/264 三栏 + 左栏折叠 + 底部状态栏。
   正文排版的"大序号细规线"是站上已定稿的设计，不在这次里回退成主仓的 hash 渐变条。 ============ */
@media (min-width:821px){
  :root{--kb-bar:53px;--kb-st:24px}
  /* Quartz 的两侧栏是 position:sticky;top:0;height:100vh，会把全宽顶栏和右栏页签条
     一起盖在底下（实测页签条量到 y=14，正压在 53px 的顶栏下面）。
     顶栏占了多高，两侧就得让出多高，底部再给状态栏留位。 */
  .left.sidebar,.right.sidebar{top:calc(var(--kb-bar) + 8px)!important;
    height:calc(100vh - var(--kb-bar) - var(--kb-st) - 24px)!important;
    max-height:none!important}
  /* Quartz 默认 320/auto/320，且它的规则是 .page > #quartz-body（特异性更高、加载更靠后），
     插件 CSS 是第 6/21 个 stylesheet，同特异性会输 → 这里只能 !important 顶。 */
  /* 第三列写 minmax(0,264px)：右栏有内容时顶到 264px，
     没内容时（首页既无目录条目也无反链）整列收成 0，不留一片空白 */
  #quartz-body{display:grid!important;
    grid-template-columns:280px minmax(0,1fr) minmax(0,264px)!important;
    column-gap:8px!important;row-gap:0!important;padding:0 8px}
  body[data-kb-fold="1"] #quartz-body{grid-template-columns:46px minmax(0,1fr) minmax(0,264px)!important}
  body[data-kb-immersive="1"] #quartz-body{grid-template-columns:0 minmax(0,1fr) 0!important;
    column-gap:0!important;padding:0}
  body[data-kb-immersive="1"] .left.sidebar,body[data-kb-immersive="1"] .right.sidebar{
    opacity:0;pointer-events:none}
  .left.sidebar{padding:.7rem .45rem 1rem .55rem;min-width:0;box-sizing:border-box;overflow:hidden}
  body[data-kb-fold="1"] .left.sidebar{padding:.7rem 0!important;border-right:none}
  body[data-kb-fold="1"] .left.sidebar>*{display:none}
  body[data-kb-fold="1"] .left.sidebar::before{content:"»";display:grid;place-items:center;
    width:calc(100% - 8px);height:34px;margin:0 4px;border:1px solid var(--gray);border-radius:8px;
    color:var(--darkgray);font-size:1rem}
  /* Quartz 桌面端给正文和两侧留了 96px 的顶部偏移（它自己那套"内容离顶"的做法）。
     现在这条位置被全宽顶栏占了，不抹掉就是正文上方一条 ~100px 的空带。 */
  .page-header{margin-top:0!important}
  .left.sidebar,.right.sidebar{padding-top:14px!important}
  /* 域色点：颜色公式跟主仓 style.css:116/132 一致（明 oklch 58% .10 / 暗 70% .14），
     hue 由脚本按 taxonomy 数据写在节点的 --dh 上 */
  .explorer-content .folder-title,.explorer-content .nav-file-title{display:flex;
    align-items:center;gap:6px}
  .kb-dh{width:8px;height:8px;border-radius:50%;flex:none;display:inline-block;
    background:oklch(58% .1 var(--dh,158))}
  body.theme-dark .kb-dh{background:oklch(70% .14 var(--dh,158))}
  /* 首页主题磁贴（桌面版；≤820px 那套在 mobileCss 里）。
     原生 a.internal 会给内部链接铺一层 --highlight 粉底，这里整体接管成卡片网格。 */
  body[data-slug="index"] .markdown-rendered>ul{list-style:none;margin:0;padding:0;
    display:grid;grid-template-columns:repeat(auto-fill,minmax(232px,1fr));gap:12px}
  body[data-slug="index"] .markdown-rendered>ul>li{display:block}
  body[data-slug="index"] .markdown-rendered>ul>li>a{display:flex;align-items:center;gap:9px;
    min-height:60px;padding:0 16px;border:1px solid var(--gray);border-radius:13px;
    background:var(--light);color:var(--dark);text-decoration:none;
    font-size:1.02rem;font-weight:700;letter-spacing:.02em;
    transition:transform .18s,border-color .18s,box-shadow .18s}
  body[data-slug="index"] .markdown-rendered>ul>li>a::after{content:"›";margin-left:auto;
    font-size:1.3rem;line-height:1;font-weight:400;color:var(--darkgray);
    transition:color .18s,transform .18s}
  body[data-slug="index"] .markdown-rendered>ul>li>a:hover{transform:translateY(-2px);
    border-color:var(--secondary);box-shadow:0 10px 24px rgba(10,12,15,.09)}
  body[data-slug="index"] .markdown-rendered>ul>li>a:hover::after{color:var(--secondary);
    transform:translateX(2px)}
  body[data-slug="index"] .markdown-rendered>ul>li>a:active{transform:translateY(0) scale(.99)}
  body[data-slug="index"] .markdown-rendered>ul>li>a:focus-visible{outline:2px solid var(--secondary);
    outline-offset:2px}
  body[data-slug="index"] .markdown-rendered>p:first-of-type{color:var(--darkgray);
    font-size:.93rem;letter-spacing:.02em;margin:.1rem 0 16px}
  /* 首页是入口页，不需要日期与阅读时长（移动端早已隐藏，这里补齐桌面端） */
  body[data-slug="index"] .page-header p.content-meta{display:none}
  /* 顶栏已经有的控件不再在左栏重复一遍；搜索按钮由常驻输入框取代。
     .search / .flex-component 是输入框的宿主，绝不能 display:none。 */
  .left.sidebar>.page-title,.flex-component .search-button,.flex-component .darkmode,
  .flex-component .readermode{display:none!important}

  #kb-deskbar{position:sticky;top:0;z-index:50;display:flex;align-items:center;gap:12px;
    height:52px;padding:0 16px;background:var(--light);border-bottom:1px solid var(--gray)}
  #kb-deskbar .kb-brand{display:flex;align-items:center;gap:7px;font-size:1.05rem;font-weight:900;
    letter-spacing:.08em;color:var(--dark);text-decoration:none;white-space:nowrap}
  #kb-deskbar .kb-brand svg{width:20px;height:20px;fill:none;stroke:var(--secondary);
    stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
  #kb-deskbar .kb-right{margin-left:auto;display:flex;gap:6px;flex:none}
  #kb-deskbar .kb-ib{width:34px;height:34px;display:grid;place-items:center;border:1px solid var(--gray);
    border-radius:9px;background:var(--light);color:var(--dark);cursor:pointer;
    transition:background .16s,color .16s,border-color .16s}
  #kb-deskbar .kb-ib:hover{background:var(--lightgray)}
  #kb-deskbar .kb-ib svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.7;
    stroke-linecap:round;stroke-linejoin:round}
  #kb-deskbar .kb-ib[aria-pressed="true"]{color:var(--secondary);border-color:var(--secondary);
    background:color-mix(in oklab,var(--secondary),transparent 92%)}
  #kb-prog{position:absolute;left:0;right:0;bottom:0;height:2px;
    background:color-mix(in oklab,var(--gray),transparent 45%)}
  #kb-prog i{display:block;height:100%;background:var(--secondary);transform-origin:0 50%;
    transform:scaleX(0);transition:transform .12s linear}
  body[data-kb-immersive="1"] #kb-deskbar{opacity:.4}
  body[data-kb-immersive="1"] #kb-deskbar:hover{opacity:1}

  /* 右栏页签化：主仓右栏是「目录/标签/备注/双链」四页签，
     站上只有前两项和入站双链能只读呈现（备注要 /api/note，按口径整块不做）。 */
  .right.sidebar{display:flex;flex-direction:column;gap:0}
  .kb-rtabs{display:flex;gap:2px;flex:none;border-bottom:1px solid var(--gray);
    padding-bottom:7px;margin-bottom:10px}
  .kb-rtab{flex:1;display:flex;align-items:center;justify-content:center;gap:5px;padding:6px 2px;
    border:0;border-radius:8px;background:none;color:var(--darkgray);font-family:inherit;
    font-size:.82rem;letter-spacing:.05em;cursor:pointer;transition:color .16s,background .16s}
  .kb-rtab:hover{color:var(--dark);background:var(--lightgray)}
  .kb-rtab[aria-selected="true"]{color:var(--secondary);
    background:color-mix(in oklab,var(--secondary),transparent 90%)}
  .kb-rtab .rt-n{font-family:Consolas,"JetBrains Mono",monospace;font-size:.7rem;opacity:.75}
  .right.sidebar .kb-rpane[hidden]{display:none!important}
  /* 页签已经写了「目录」，TOC 自带的那个同名表头就是重复 */
  .right.sidebar .toc>.toc-header{display:none}
  .right.sidebar .toc{flex:1;min-height:0;overflow-y:auto}
  .right.sidebar .tags{margin:0;gap:6px}
  .right.sidebar .tags li a{display:inline-block;padding:3px 9px;border:1px solid var(--gray);
    border-radius:7px;font-size:.8rem;color:var(--darkgray);text-decoration:none}
  .right.sidebar .tags li a:hover{color:var(--secondary);border-color:var(--secondary)}

  #kb-status{position:fixed;left:0;right:0;bottom:0;z-index:45;display:flex;align-items:center;
    gap:14px;height:24px;padding:0 14px;border-top:1px solid var(--gray);background:var(--light);
    font-family:Consolas,"JetBrains Mono",monospace;font-size:.68rem;letter-spacing:.05em;
    color:var(--darkgray)}
  #kb-status .st-path{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
    color:var(--dark)}
  #kb-status .st-r{margin-left:auto;white-space:nowrap}
  #quartz-body{padding-bottom:32px!important}

  #kb-help{position:fixed;top:64px;right:16px;z-index:60;width:286px;padding:14px 16px 15px;
    border:1px solid var(--gray);border-radius:12px;background:var(--light);
    box-shadow:0 18px 46px rgba(10,12,15,.16)}
  #kb-help h4{margin:0 0 10px;font-size:.7rem;letter-spacing:.2em;color:var(--darkgray)}
  #kb-help dl{display:grid;grid-template-columns:auto 1fr;gap:7px 12px;margin:0;font-size:.85rem}
  #kb-help dt{margin:0}
  #kb-help dt kbd{border:1px solid var(--gray);border-bottom-width:2px;border-radius:5px;padding:1px 6px;
    font-family:Consolas,"JetBrains Mono",monospace;font-size:.76rem;color:var(--dark)}
  #kb-help dd{margin:0;color:var(--darkgray)}
}
`;


const deskScript = `
(function(){
  var M=window.matchMedia('(min-width:821px)');
  var SV=" fill='none' stroke='currentColor' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'>";
  var IC={
    brand:"<svg viewBox='0 0 24 24'"+SV+"<path d='M12 2.9 20.4 7v10L12 21.1 3.6 17V7z'/><path d='M12 2.9v18.2M3.6 7l8.4 4.1L20.4 7'/></svg>",
    search:"<svg viewBox='0 0 24 24' stroke-width='1.9'><circle cx='10.8' cy='10.8' r='6.4'/><path d='m15.6 15.6 4.3 4.3'/></svg>",
    fold:"<svg viewBox='0 0 24 24'><path d='M9.6 5.4 3.8 12l5.8 6.6M13.4 5.6h6.8M13.4 18.4h6.8M13.4 12h6.8'/></svg>",
    imm:"<svg viewBox='0 0 24 24'><path d='M3.6 8.2V4.4a.8.8 0 0 1 .8-.8h3.8M20.4 8.2V4.4a.8.8 0 0 0-.8-.8h-3.8M3.6 15.8v3.8a.8.8 0 0 0 .8.8h3.8M20.4 15.8v3.8a.8.8 0 0 1-.8.8h-3.8'/></svg>",
    moon:"<svg viewBox='0 0 24 24' stroke-width='1.7'><path d='M20.4 14.6A8.7 8.7 0 0 1 9.4 3.6a8.8 8.8 0 1 0 11 11z'/></svg>",
    sun:"<svg viewBox='0 0 24 24' stroke-width='1.7'><circle cx='12' cy='12' r='4.1'/><path d='M12 2.6v2.1M12 19.3v2.1M4.5 4.5l1.5 1.5M18 18l1.5 1.5M2.6 12h2.1M19.3 12h2.1M4.5 19.5 6 18M18 6l1.5-1.5'/></svg>"
  };
  var KEYS=[['/','聚焦搜索'],['?','这份快捷键'],['j / k','下一篇 / 上一篇'],['W','沉浸模式'],['Esc','关闭浮层']];
  function el(t,c,h2){var n=document.createElement(t);if(c)n.className=c;
    if(h2!==undefined)n.innerHTML=h2;return n}
  function root(){var b=document.body.getAttribute('data-basepath')||'';
    while(b.length>0&&b.charAt(b.length-1)==='/')b=b.slice(0,-1);return b+'/'}
  function q(sel){return document.querySelector(sel)}
  function openSearch(){var i=q('.search-bar');if(i)i.focus()}
  function treeLinks(){
    var seen={},out=[];
    [].slice.call(document.querySelectorAll('.explorer-content a[href]')).forEach(function(a){
      var h=a.getAttribute('href');
      if(!/\\.html$/.test(h)||seen[h])return;seen[h]=1;out.push(a)});
    return out}
  function step(dir){
    var list=treeLinks();if(list.length<2)return;
    var here=location.pathname;var idx=-1;
    list.forEach(function(a,i){
      var u=new URL(a.getAttribute('href'),location.href).pathname;
      if(u===here)idx=i});
    if(idx<0)return;
    var n=list[(idx+dir+list.length)%list.length];
    location.href=n.getAttribute('href')}
  function toggleAttr(name){var b=document.body;
    var on=b.getAttribute(name)==='1';
    if(on)b.removeAttribute(name);else b.setAttribute(name,'1');return !on}
  var PANE=[['toc','目录'],['backlinks','双链']];
  /* 域色点：hue 的权威是主仓 content/_meta/taxonomy.json，
     publish_site.py 把它导成 static/zhiku-taxonomy.json 随站发布；
     插件运行时读这份**数据**贴到节点上，CSS 里不抄域名清单（不变量 5）。 */
  var HUES=undefined;
  function segOf(href){
    var u;try{u=new URL(href,location.href).pathname}catch(e){return ''}
    var r=root();if(u.indexOf(r)===0)u=u.slice(r.length);
    return u.split('/')[0]||''}
  function dot(holder){
    if(!holder)return;
    for(var i=0;i<holder.children.length;i++){
      if(holder.children[i].className==='kb-dh')return}
    holder.insertBefore(el('i','kb-dh'),holder.firstChild)}
  function paintHues(){
    if(!HUES)return;
    [].slice.call(document.querySelectorAll('.explorer-content>ul>li')).forEach(function(li){
      if(li.classList.contains('overflow-end'))return;
      var a=li.querySelector('a[href]');if(!a)return;
      var seg=segOf(a.getAttribute('href'));
      var h=HUES[seg];
      var t=li.querySelector('.folder-title')||li.querySelector('.nav-file-title');
      if(li.dataset.kbHue)return;
      if(h===undefined)return;
      li.dataset.kbHue=h;li.style.setProperty('--dh',h);
      dot(t)});
    [].slice.call(document.querySelectorAll(
      'body[data-slug="index"] .markdown-rendered>ul>li>a[href]')).forEach(function(a){
      if(a.dataset.kbHue)return;
      var h=HUES[segOf(a.getAttribute('href'))];
      if(h===undefined)return;
      a.dataset.kbHue=h;a.style.setProperty('--dh',h);
      dot(a)})}
  function loadHues(){
    if(HUES){paintHues();return}
    fetch(root()+'static/zhiku-taxonomy.json').then(function(r){
      return r.ok?r.json():{}}).then(function(j){HUES=j;paintHues()})
      .catch(function(){HUES={}})}
  function tabsify(){
    var rail=q('.right.sidebar');if(!rail)return;
    /* build() 会跑两次（首次加载 + Quartz 的 nav 事件），页签条住在右栏里、
       不在 purge 范围内，不守一下就会叠两条 */
    if(rail.querySelector('.kb-rtabs'))return;
    var kids=[].slice.call(rail.children).filter(function(c){
      var cl=' '+c.className+' ';
      for(var i=0;i<PANE.length;i++){if(cl.indexOf(' '+PANE[i][0]+' ')>=0)return true}
      return false});
    if(kids.length<2)return;
    var strip=el('div','kb-rtabs');strip.setAttribute('role','tablist');
    var btns=[];
    kids.forEach(function(c){
      var key='',label='信息';
      PANE.forEach(function(p){if(c.classList.contains(p[0])){key=p[0];label=p[1]}});
      var n=c.querySelectorAll('li').length;
      var b=el('button','kb-rtab');b.type='button';b.setAttribute('role','tab');
      b.setAttribute('aria-selected','false');
      b.appendChild(document.createTextNode(label));
      if(n)b.appendChild(el('span','rt-n',String(n)));
      b.addEventListener('click',function(){pick(kids.indexOf(c))});
      strip.appendChild(b);btns.push(b);c.classList.add('kb-rpane')});
    function pick(i){
      kids.forEach(function(c,k){c.hidden=(k!==i)});
      btns.forEach(function(b,k){b.setAttribute('aria-selected',k===i?'true':'false')})}
    rail.insertBefore(strip,rail.firstChild);
    pick(0)}
  function help(open){
    var box=document.getElementById('kb-help');
    if(!open){if(box)box.remove();return}
    if(box)return;
    box=el('div');box.id='kb-help';box.setAttribute('role','dialog');
    box.setAttribute('aria-label','快捷键');
    var dl=el('dl');
    KEYS.forEach(function(k){dl.appendChild(el('dt',null,'<kbd>'+k[0]+'</kbd>'));
      dl.appendChild(el('dd',null,k[1]))});
    box.appendChild(el('h4',null,'键盘'));box.appendChild(dl);
    document.body.appendChild(box)}
  function onKey(e){
    if(!M.matches)return;
    var t=(e.target&&e.target.tagName)||'';
    if(t==='INPUT'||t==='TEXTAREA'||e.metaKey||e.ctrlKey||e.altKey)return;
    var bar=document.getElementById('kb-deskbar');
    if(e.key==='/'){e.preventDefault();openSearch()}
    else if(e.key==='?'){e.preventDefault();help(!document.getElementById('kb-help'))}
    else if(e.key==='Escape'){help(false)}
    else if(e.key==='w'||e.key==='W'){toggleAttr('data-kb-immersive');if(bar)syncPressed(bar)}
    else if(e.key==='j'){e.preventDefault();step(1)}
    else if(e.key==='k'){e.preventDefault();step(-1)}}
  function syncPressed(bar){
    var f=bar.querySelector('.kb-fold'),w=bar.querySelector('.kb-imm'),t=bar.querySelector('.kb-theme');
    if(f)f.setAttribute('aria-pressed',document.body.getAttribute('data-kb-fold')==='1'?'true':'false');
    if(w)w.setAttribute('aria-pressed',document.body.getAttribute('data-kb-immersive')==='1'?'true':'false');
    if(t)t.innerHTML=document.body.classList.contains('theme-dark')?IC.sun:IC.moon}
  function purge(){['kb-deskbar','kb-status','kb-help'].forEach(function(i){
    var n=document.getElementById(i);if(n)n.remove()})}
  function build(){
    purge();
    document.body.removeAttribute('data-kb-fold');
    document.body.removeAttribute('data-kb-immersive');
    if(!M.matches)return;
    var r=root();
    var bar=el('div');bar.id='kb-deskbar';
    var brand=el('a','kb-brand',IC.brand+'<span>知库</span>');brand.href=r;
    brand.title='返回总览';
    var right=el('div','kb-right');
    var fold=el('button','kb-ib kb-fold',IC.fold);fold.type='button';
    fold.title='收起 / 展开分类树';fold.addEventListener('click',function(){
      toggleAttr('data-kb-fold');syncPressed(bar)});
    var imm=el('button','kb-ib kb-imm',IC.imm);imm.type='button';
    imm.title='沉浸模式（W）';imm.addEventListener('click',function(){
      toggleAttr('data-kb-immersive');syncPressed(bar)});
    var th=el('button','kb-ib kb-theme',IC.moon);th.type='button';th.title='切换白天 / 夜间';
    th.addEventListener('click',function(){var x=q('.darkmode');if(x)x.click();
      setTimeout(function(){syncPressed(bar)},0)});
    right.appendChild(fold);right.appendChild(imm);right.appendChild(th);
    var prog=el('div');prog.id='kb-prog';prog.innerHTML='<i></i>';
    bar.appendChild(brand);
    bar.appendChild(right);bar.appendChild(prog);
    document.body.insertBefore(bar,document.body.firstChild);
    var st=el('div');st.id='kb-status';
    st.innerHTML='<span>知库 · 公开站</span><span class="st-path"></span>'+
      '<span class="st-r"><span class="st-theme"></span> · ? 快捷键</span>';
    document.body.appendChild(st);
    syncStatus();syncPressed(bar);
    tabsify();
    loadHues();
    /* explorer 的树是运行时从 <template> 建的，比本脚本晚到，所以补三次重绘 */
    [400,1200,2400].forEach(function(ms){setTimeout(paintHues,ms)});
    wire();
  }
  /* 监听只接一次：SPA 换页不重建 document，闭包里存 DOM 会越攒越多，
     所以回调一律实时查。 */
  var wired=false,raf=0;
  function syncStatus(){var st=document.getElementById('kb-status');if(!st)return;
    var r=root();var p=location.pathname;if(p.indexOf(r)===0)p=p.slice(r.length);
    st.querySelector('.st-path').textContent=p||'（首页）';
    st.querySelector('.st-theme').textContent=
      document.body.classList.contains('theme-dark')?'夜间':'白天'}
  function onScroll(){
    var prog=document.getElementById('kb-prog');if(!prog)return;
    if(raf)return;raf=requestAnimationFrame(function(){raf=0;
      var h=document.documentElement.scrollHeight-window.innerHeight;
      prog.firstChild.style.transform='scaleX('+(h>0?Math.min(1,window.scrollY/h):0)+')';})}
  function wire(){
    if(wired)return;wired=true;
    document.addEventListener('keydown',onKey);
    window.addEventListener('scroll',onScroll,{passive:true});
    new MutationObserver(function(){
      var bar=document.getElementById('kb-deskbar');
      if(bar)syncPressed(bar);syncStatus()}).observe(document.body,
      {attributes:true,attributeFilter:['class','data-kb-fold','data-kb-immersive']});
  }
  function run(){if(M.matches)build();else purge()}
  run();
  document.addEventListener('nav',run);
  if(M.addEventListener)M.addEventListener('change',run);
})();
`;


function ZhikuTypographyView() {
  return null
}
ZhikuTypographyView.css = css + mobileCss + deskCss
ZhikuTypographyView.afterDOMLoaded = script + mobileScript + deskScript

const ZhikuTypography = () => ZhikuTypographyView

export { ZhikuTypography }
