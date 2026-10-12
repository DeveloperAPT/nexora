/* NEXORA static edition — no Node.js, npm, bundler, or server required. */
'use strict';

const iconsModule = (function(){
const paths = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>',
  spark: '<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z"/><path d="m19 14 1 2.5 2.5 1-2.5 1L19 21l-1-2.5-2.5-1 2.5-1L19 14Z"/>',
  workflow: '<rect x="3" y="3" width="7" height="6" rx="1.5"/><rect x="14" y="15" width="7" height="6" rx="1.5"/><path d="M6.5 9v3a3 3 0 0 0 3 3H14"/><path d="m11 12 3 3-3 3"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z"/><path d="M4 17a2.5 2.5 0 0 1 2.5-2.5H20"/>',
  calc: '<rect x="5" y="2.5" width="14" height="19" rx="2"/><path d="M8 6h8v4H8zM8 14h2m4 0h2M8 17.5h2m4 0h2"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a7.9 7.9 0 0 1-1.8 1l-.3 1.8h-2.8l-.3-1.8a7.9 7.9 0 0 1-1.8-1l-1.7.6-1.4-2.4 1.4-1.1a7.5 7.5 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.6a7.9 7.9 0 0 1 1.8-1l.3-1.8h2.8l.3 1.8a7.9 7.9 0 0 1 1.8 1l1.7-.6 1.4 2.4-1.4 1.1a7.5 7.5 0 0 1 0 2Z" transform="translate(-1 -1) scale(1.08)"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  heart: '<path d="M20.8 8.8c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  external: '<path d="M14 4h6v6m0-6-9 9"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/>'
};
function icon(name, size = 18) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.spark}</svg>`;
}
return {icon};
})();
const { icon } = iconsModule;

const storageModule = (function(){
const PREFIX = "nexora:";
function read(key, fallback) {
  try {
    const value = localStorage.getItem(PREFIX + key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}
function write(key, value) {
  try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); return true; }
  catch { return false; }
}
return {read, write};
})();
const { read, write } = storageModule;

const catalogModule = (function(){
const tools = [
  { id: 1, name: "ChatGPT", category: "Ассистенты", description: "Универсальный помощник для идей, текста, анализа и обучения.", tag: "Популярное", color: "mint", mark: "✳", url: "https://chatgpt.com" },
  { id: 2, name: "Claude", category: "Ассистенты", description: "Работа с длинными документами, текстами и сложными задачами.", tag: "Тексты", color: "peach", mark: "✺", url: "https://claude.ai" },
  { id: 3, name: "Perplexity", category: "Исследования", description: "Поиск информации с источниками и краткими обзорами.", tag: "Поиск", color: "blue", mark: "◈", url: "https://perplexity.ai" },
  { id: 4, name: "Notion AI", category: "Продуктивность", description: "Организация заметок, проектов и рабочих материалов.", tag: "Рабочее пространство", color: "lilac", mark: "N", url: "https://notion.so" },
  { id: 5, name: "Canva", category: "Дизайн", description: "Создание визуальных материалов, презентаций и публикаций.", tag: "Визуал", color: "pink", mark: "C", url: "https://canva.com" },
  { id: 6, name: "Make", category: "Автоматизация", description: "Связывайте приложения в наглядные сценарии автоматизации.", tag: "No-code", color: "violet", mark: "M", url: "https://make.com" },
  { id: 7, name: "GitHub Copilot", category: "Разработка", description: "ИИ-поддержка при написании и понимании кода.", tag: "Код", color: "slate", mark: "⌘", url: "https://github.com/features/copilot" },
  { id: 8, name: "ElevenLabs", category: "Аудио", description: "Генерация речи и работа с голосовыми проектами.", tag: "Голос", color: "gold", mark: "≋", url: "https://elevenlabs.io" }
];

const articles = [
  { id: 1, category: "Практика", read: "6 минут", title: "Как встроить ИИ в повседневную рутину", summary: "Небольшие сценарии, которые помогают тратить меньше времени на повторяющиеся задачи.", date: "12 окт. 2026", icon: "✳" },
  { id: 2, category: "Автоматизация", read: "8 минут", title: "Автоматизация без кода: с чего начать", summary: "Разбираем триггеры, действия и простые цепочки на понятных примерах.", date: "10 окт. 2026", icon: "⌘" },
  { id: 3, category: "Гид", read: "5 минут", title: "Как выбирать ИИ-инструменты осознанно", summary: "Критерии выбора: задача, цена, приватность и качество результата.", date: "08 окт. 2026", icon: "◈" }
];
return {tools, articles};
})();
const { tools, articles } = catalogModule;

const shellModule = (function(){
const nav = [
  { id: "dashboard", label: "Обзор", glyph: "grid" },
  { id: "tools", label: "AI Explorer", glyph: "spark" },
  { id: "automations", label: "Автоматизации", glyph: "workflow" },
  { id: "calculator", label: "Калькулятор", glyph: "calc" },
  { id: "knowledge", label: "База знаний", glyph: "book" }
];

function shell(active, content, savedCount = 0) {
  return `
    <div class="app-shell">
      <aside class="sidebar" id="sidebar">
        <a class="brand" href="#dashboard" aria-label="NEXORA — на главную">
          <span class="brand-mark"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 25V7h4l10 11V7h4v18h-4L11 14v11z" fill="currentColor"/></svg></span>
          <span class="brand-word">NEXORA<span class="brand-dot">.</span><small>INTELLIGENCE SPACE</small></span>
        </a>
        <div class="workspace-label">РАБОЧЕЕ ПРОСТРАНСТВО</div>
        <nav class="side-nav" aria-label="Основная навигация">
          ${nav.map(item => `<a class="nav-link ${active === item.id ? "active" : ""}" href="#${item.id}" ${active === item.id ? 'aria-current="page"' : ""}>${icon(item.glyph, 18)}<span>${item.label}</span>${item.id === "tools" ? '<span class="nav-count">08</span>' : ""}</a>`).join("")}
        </nav>
        <div class="sidebar-bottom">
          <div class="plan-card">
            <div class="plan-icon">${icon("spark", 17)}</div>
            <strong>Твоё пространство</strong>
            <p>Собирай идеи и превращай их в рабочие процессы.</p>
            <a href="#automations" class="plan-link">Создать сценарий ${icon("arrow", 14)}</a>
          </div>
          <a class="nav-link ${active === "settings" ? "active" : ""}" href="#settings">${icon("settings", 18)}<span>Настройки</span></a>
          <div class="profile-mini">
            <div class="avatar">N</div><div class="profile-text"><strong>Исследователь</strong><span>Личное пространство</span></div><span class="status-dot"></span>
          </div>
        </div>
      </aside>
      <div class="mobile-scrim" id="mobileScrim"></div>
      <main class="main-area">
        <header class="topbar">
          <button class="icon-button mobile-menu" id="menuToggle" aria-label="Открыть меню">${icon("menu", 20)}</button>
          <div class="breadcrumb"><span>Workspace</span><span class="crumb-sep">/</span><strong>${nav.find(n => n.id === active)?.label || (active === "settings" ? "Настройки" : "Страница")}</strong></div>
          <div class="topbar-actions">
            <label class="global-search">${icon("search", 17)}<input id="globalSearch" placeholder="Быстрый поиск..." aria-label="Быстрый поиск"><kbd>⌘ K</kbd></label>
            <button class="icon-button notification-button" id="notificationButton" aria-label="Уведомления">${icon("bell", 18)}<i></i></button>
            <button class="theme-toggle" id="themeToggle" aria-label="Переключить тему"><span class="theme-toggle-knob"></span></button>
          </div>
        </header>
        <div class="page-content">${content}</div>
        <footer class="app-footer"><span>© 2026 NEXORA</span><span>Создано для более умной работы <b>✳</b></span><a href="#settings">Настройки приватности</a></footer>
      </main>
      <div class="toast-region" id="toastRegion" aria-live="polite"></div>
      <div class="modal-root" id="modalRoot"></div>
    </div>`;
}
return {shell};
})();
const { shell } = shellModule;

const dashboardModule = (function(){
const toolMark = t => `<span class="tool-mark ${t.color}">${t.mark}</span>`;
function dashboard(favorites = []) {
  const savedTools = tools.filter(t => favorites.includes(t.id));
  return `
    <section class="welcome-row">
      <div><div class="eyebrow"><span class="eyebrow-line"></span> ПОНЕДЕЛЬНИК, 12 ОКТЯБРЯ</div>
      <h1>Хорошие идеи.<br><span>Умные решения.</span></h1>
      <p class="welcome-copy">Твоё пространство для работы с ИИ, автоматизацией<br class="desktop-break"> и технологиями, которые освобождают время.</p>
      <div class="welcome-actions"><a class="button button-primary" href="#tools">Исследовать инструменты ${icon("arrow", 16)}</a><a class="button button-ghost" href="#automations">${icon("workflow", 16)} Собрать автоматизацию</a></div></div>
      <div class="hero-art" aria-label="Абстрактная орбитальная графика NEXORA"><div class="orbital orbital-one"></div><div class="orbital orbital-two"></div><div class="orbital orbital-three"></div><div class="hero-core"><span>n.</span></div><div class="orbit-dot dot-one"></div><div class="orbit-dot dot-two"></div><div class="orbit-label label-one">IDEAS → ACTION</div><div class="orbit-label label-two">AI / 2026</div></div>
    </section>
    <section class="stats-grid">
      <article class="stat-card"><div class="stat-top"><span>Инструменты в каталоге</span><span class="stat-icon">${icon("spark", 17)}</span></div><div class="stat-value">08 <span class="stat-trend">+2 скоро</span></div><div class="stat-foot">Подборка для разных задач</div><div class="stat-sparkline sparkline-a"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></article>
      <article class="stat-card"><div class="stat-top"><span>Сохранено в избранном</span><span class="stat-icon">${icon("heart", 17)}</span></div><div class="stat-value">${String(favorites.length).padStart(2,"0")} <span class="stat-unit">инструм.</span></div><div class="stat-foot">Твоя персональная коллекция</div><div class="stat-sparkline sparkline-b"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></article>
      <article class="stat-card"><div class="stat-top"><span>Время для важных дел</span><span class="stat-icon">${icon("clock", 17)}</span></div><div class="stat-value">+4.5 <span class="stat-unit">ч / нед.</span></div><div class="stat-foot">Демонстрационная оценка</div><div class="stat-sparkline sparkline-c"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></article>
    </section>
    <section class="section-block">
      <div class="section-heading"><div><div class="eyebrow">ТВОЙ НАБОР ИНСТРУМЕНТОВ</div><h2>Начни с полезного</h2><p>Подобрали сервисы, которые стоит изучить первыми.</p></div><a class="text-link" href="#tools">Весь каталог ${icon("arrow", 15)}</a></div>
      <div class="featured-tools">${tools.slice(0,4).map(t => `<article class="tool-card"><div class="tool-card-top">${toolMark(t)}<button class="favorite-button ${favorites.includes(t.id) ? "is-favorite" : ""}" data-favorite="${t.id}" aria-label="${favorites.includes(t.id) ? "Убрать из избранного" : "Добавить в избранное"}">${icon("heart", 17)}</button></div><div class="tool-title-row"><h3>${t.name}</h3><span class="tool-tag">${t.tag}</span></div><p>${t.description}</p><a href="#tools" class="tool-open" data-tool-open="${t.id}">Подробнее ${icon("arrow", 15)}</a></article>`).join("")}</div>
    </section>
    <section class="lower-grid">
      <div class="section-block automation-preview"><div class="section-heading compact"><div><div class="eyebrow">AUTOMATION STUDIO</div><h2>Меньше рутины.<br>Больше результата.</h2></div><span class="live-pill"><i></i> В РАЗРАБОТКЕ</span></div><p class="panel-copy">Соедини привычные действия в один сценарий. Начни с простой цепочки и адаптируй её под себя.</p><div class="flow-preview"><div class="flow-node trigger"><span class="flow-node-icon">${icon("clock", 16)}</span><div><b>Каждое утро</b><small>Триггер</small></div><span class="node-port"></span></div><div class="flow-connector"><span></span></div><div class="flow-node action"><span class="flow-node-icon">${icon("spark", 16)}</span><div><b>Собрать дайджест</b><small>Действие</small></div><span class="node-port"></span></div><div class="flow-connector"><span></span></div><div class="flow-node done"><span class="flow-node-icon">${icon("book", 16)}</span><div><b>Сохранить заметку</b><small>Результат</small></div></div></div><a href="#automations" class="button button-secondary full-button">Открыть конструктор ${icon("arrow", 15)}</a></div>
      <div class="section-block recent-panel"><div class="section-heading compact"><div><div class="eyebrow">NEXORA JOURNAL</div><h2>Свежие идеи</h2></div><a href="#knowledge" class="icon-link" aria-label="Все статьи">${icon("arrow", 17)}</a></div><div class="article-list">${articles.slice(0,3).map(a => `<a class="article-row" href="#knowledge"><span class="article-icon article-${a.id}">${a.icon}</span><span class="article-info"><b>${a.title}</b><small>${a.category} <i>·</i> ${a.read}</small></span><span class="article-arrow">${icon("arrow", 15)}</span></a>`).join("")}</div><a class="text-link journal-link" href="#knowledge">Перейти в базу знаний ${icon("arrow", 15)}</a></div>
    </section>
    <section class="quote-banner"><div class="quote-symbol">“</div><div><p>Автоматизируй повторяющееся. Оставь человеку то, что требует мысли.</p><span>ПРИНЦИП NEXORA № 01</span></div><div class="quote-decoration">N<span>.</span></div></section>
  `;
}
return {dashboard};
})();
const { dashboard } = dashboardModule;

const toolsPageModule = (function(){
const mark = t => `<span class="tool-mark ${t.color}">${t.mark}</span>`;
function toolsPage(favorites = [], query = "", category = "Все") {
  const cats = ["Все", ...new Set(tools.map(t => t.category))];
  const normalized = query.trim().toLowerCase();
  const filtered = tools.filter(t => (category === "Все" || t.category === category) && (!normalized || `${t.name} ${t.description} ${t.category} ${t.tag}`.toLowerCase().includes(normalized)));
  return `<section class="page-intro"><div class="eyebrow"><span class="eyebrow-line"></span> AI EXPLORER</div><div class="page-title-row"><div><h1>Инструменты, <span>которые помогают.</span></h1><p>Открой сервисы для идей, исследований, дизайна и автоматизации.</p></div><div class="count-bubble"><strong>${String(filtered.length).padStart(2,"0")}</strong><span>инструментов</span></div></div></section>
    <div class="catalog-toolbar"><label class="catalog-search">${icon("search",18)}<input id="catalogSearch" value="${escapeHtml(query)}" placeholder="Найти инструмент..." aria-label="Поиск по каталогу"><kbd>/</kbd></label><label class="sort-select"><span>Категория</span><select id="categoryFilter">${cats.map(c=>`<option ${c===category?"selected":""}>${c}</option>`).join("")}</select></label><span class="catalog-result">${filtered.length} результатов</span></div>
    <div class="catalog-grid">${filtered.map(t=>`<article class="tool-card catalog-card"><div class="tool-card-top">${mark(t)}<button class="favorite-button ${favorites.includes(t.id)?"is-favorite":""}" data-favorite="${t.id}" aria-label="Переключить избранное">${icon("heart",17)}</button></div><div class="tool-title-row"><h3>${t.name}</h3><span class="tool-tag">${t.category}</span></div><p>${t.description}</p><div class="catalog-card-bottom"><span class="catalog-tag">${t.tag}</span><button class="tool-open" data-tool-open="${t.id}">О сервисе ${icon("arrow",15)}</button></div></article>`).join("") || `<div class="empty-state"><span>${icon("search",26)}</span><h3>Ничего не найдено</h3><p>Попробуй изменить запрос или выбрать другую категорию.</p><button class="button button-secondary" id="resetCatalog">Сбросить фильтры</button></div>`}</div>`;
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
return {toolsPage};
})();
const { toolsPage } = toolsPageModule;

const automationsModule = (function(){
function automationsPage() {
 const flows = read("flows", []);
 return `<section class="page-intro"><div class="eyebrow"><span class="eyebrow-line"></span> AUTOMATION STUDIO</div><div class="page-title-row"><div><h1>Рутина — на автопилот.</h1><p>Собирай последовательности действий из простых блоков.</p></div><button class="button button-primary" id="newFlow">${icon("plus",17)} Новый сценарий</button></div></section>
 <div class="automation-layout"><section class="section-block editor-panel"><div class="editor-top"><div><span class="editor-label">НОВЫЙ WORKFLOW</span><h2 id="flowTitle">Утренний дайджест</h2></div><span class="draft-badge"><i></i> Черновик</span></div><div class="workflow-canvas" id="workflowCanvas"><div class="canvas-grid"></div><div class="workflow-node trigger-node" data-node="trigger"><span class="workflow-node-icon">${icon("clock",17)}</span><div><b>По расписанию</b><small>Триггер · Каждый день, 09:00</small></div><button class="node-menu" data-remove-node="trigger" aria-label="Удалить блок">×</button></div><div class="node-link"><span></span></div><div class="workflow-node ai-node" data-node="ai"><span class="workflow-node-icon">${icon("spark",17)}</span><div><b>Подготовить сводку</b><small>Действие · Обработка информации</small></div><button class="node-menu" data-remove-node="ai" aria-label="Удалить блок">×</button></div><div class="node-link"><span></span></div><div class="workflow-node save-node" data-node="save"><span class="workflow-node-icon">${icon("book",17)}</span><div><b>Сохранить результат</b><small>Действие · Заметка</small></div><button class="node-menu" data-remove-node="save" aria-label="Удалить блок">×</button></div><div class="canvas-caption">${icon("workflow",14)} ВИЗУАЛЬНАЯ СХЕМА · ДЕМО</div></div><div class="editor-actions"><button class="button button-secondary" id="addFlowStep">${icon("plus",16)} Добавить шаг</button><button class="button button-primary" id="saveFlow">${icon("check",16)} Сохранить сценарий</button></div></section>
 <aside class="section-block node-library"><div class="eyebrow">БИБЛИОТЕКА БЛОКОВ</div><h2>Собери цепочку</h2><p>Добавляй шаги и редактируй схему под свою задачу.</p><button class="library-item" data-add-type="trigger"><span class="library-icon trigger-lib">${icon("clock",17)}</span><span><b>Триггер</b><small>С чего всё начинается</small></span>${icon("plus",16)}</button><button class="library-item" data-add-type="ai"><span class="library-icon ai-lib">${icon("spark",17)}</span><span><b>ИИ-действие</b><small>Обработать или создать</small></span>${icon("plus",16)}</button><button class="library-item" data-add-type="save"><span class="library-icon save-lib">${icon("book",17)}</span><span><b>Сохранение</b><small>Записать результат</small></span>${icon("plus",16)}</button><div class="library-tip"><span>${icon("lightbulb",17)}</span><p><b>Подсказка</b><br>Начни с триггера, затем добавь действие и место для результата.</p></div></aside></div>
 <section class="section-block saved-flows"><div class="section-heading compact"><div><div class="eyebrow">ТВОИ ПРОЦЕССЫ</div><h2>Сохранённые сценарии</h2></div><span class="saved-count">${flows.length} сохранено</span></div><div id="savedFlowsList">${flows.length ? flows.map((f,i)=>`<div class="saved-flow-row"><span class="saved-flow-icon">${icon("workflow",18)}</span><span><b>${escapeHtml(f.name)}</b><small>${f.steps} шагов · сохранён локально</small></span><button class="text-button" data-delete-flow="${i}">Удалить</button></div>`).join("") : `<div class="empty-inline">${icon("workflow",20)}<span>Пока нет сохранённых сценариев. Сохрани свою первую схему выше.</span></div>`}</div></section>`;
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
return {automationsPage};
})();
const { automationsPage } = automationsModule;

const calculatorModule = (function(){
function calculatorPage() {
 return `<section class="page-intro"><div class="eyebrow"><span class="eyebrow-line"></span> SMART CALCULATOR</div><h1>Верни себе <span>время.</span></h1><p>Оцени, сколько времени может освободить автоматизация повторяющихся задач.</p></section>
 <div class="calculator-layout"><section class="section-block calculator-panel"><div class="panel-heading"><div><h2>Твои привычные задачи</h2><p>Меняй параметры — результат обновится автоматически.</p></div><span class="panel-heading-icon">${icon("calc",20)}</span></div>
 <label class="range-field"><span><b>Сколько задач повторяется?</b><output id="tasksOutput">5 задач</output></span><input id="tasksRange" type="range" min="1" max="20" value="5"><span class="range-labels"><small>1 задача</small><small>20 задач</small></span></label>
 <label class="range-field"><span><b>Время на одну задачу</b><output id="minutesOutput">20 минут</output></span><input id="minutesRange" type="range" min="5" max="120" step="5" value="20"><span class="range-labels"><small>5 мин.</small><small>120 мин.</small></span></label>
 <label class="range-field"><span><b>Повторений в неделю</b><output id="repeatOutput">5 раз</output></span><input id="repeatRange" type="range" min="1" max="7" value="5"><span class="range-labels"><small>1 раз</small><small>7 раз</small></span></label>
 <label class="range-field"><span><b>Ожидаемая доля автоматизации</b><output id="percentOutput">60%</output></span><input id="percentRange" type="range" min="10" max="90" step="5" value="60"><span class="range-labels"><small>10%</small><small>90%</small></span></label>
 <p class="form-note">${icon("spark",15)} Это ориентировочная модель, а не гарантия экономии.</p></section>
 <section class="results-panel"><div class="result-orbit"><div class="result-ring"><span>ТВОЙ ПОТЕНЦИАЛ</span><strong id="weeklyHours">5.0</strong><small>часов в неделю</small></div></div><div class="result-metrics"><div><span>За месяц</span><b id="monthlyHours">21.7 ч</b></div><div><span>За год</span><b id="yearlyHours">260 ч</b></div></div><div class="result-note"><span class="result-note-icon">${icon("spark",17)}</span><p><b>Представь, что можно сделать с этим временем.</b><br>Начни с одной повторяющейся задачи и проверь результат на практике.</p></div><button class="button button-primary full-button" id="saveCalculation">Сохранить расчёт ${icon("arrow",16)}</button></section></div>`;
}
return {calculatorPage};
})();
const { calculatorPage } = calculatorModule;

const knowledgeModule = (function(){
function knowledgePage(query = "") {
 const q=query.trim().toLowerCase();
 const rows=articles.filter(a=>`${a.title} ${a.summary} ${a.category}`.toLowerCase().includes(q));
 return `<section class="page-intro"><div class="eyebrow"><span class="eyebrow-line"></span> KNOWLEDGE HUB</div><h1>Знания, которые <span>двигают вперёд.</span></h1><p>Практические идеи об ИИ, технологиях и автоматизации — без лишнего шума.</p></section><div class="knowledge-hero"><div><span class="featured-label">ИЗБРАННЫЙ МАТЕРИАЛ · 6 МИНУТ</span><h2>Не нужно автоматизировать всё.<br><em>Начни с одного.</em></h2><p>Найди повторяющееся действие, которое забирает время, и преврати его в простой процесс.</p><a href="#knowledge" class="button button-primary" id="featuredArticle">Читать материал ${icon("arrow",16)}</a></div><div class="knowledge-art"><div class="knowledge-orbit k-orbit-1"></div><div class="knowledge-orbit k-orbit-2"></div><div class="knowledge-cube">N<span>.</span></div><span class="knowledge-art-label">THINK<br>FORWARD</span></div></div><div class="section-heading knowledge-heading"><div><div class="eyebrow">ЖУРНАЛ NEXORA</div><h2>Свежие материалы</h2></div><label class="inline-search">${icon("search",16)}<input id="knowledgeSearch" value="${escapeHtml(query)}" placeholder="Найти статью..."></label></div><div class="knowledge-grid">${rows.map(a=>`<article class="knowledge-card"><div class="knowledge-card-art art-${a.id}"><span>${a.icon}</span><small>${a.category.toUpperCase()}</small></div><div class="knowledge-card-body"><div class="article-meta">${a.category}<span>·</span>${a.read}</div><h3>${a.title}</h3><p>${a.summary}</p><button class="text-link" data-article="${a.id}">Читать статью ${icon("arrow",15)}</button></div></article>`).join("") || `<div class="empty-state"><h3>Материалы не найдены</h3><p>Попробуй другой поисковый запрос.</p></div>`}</div>`;
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
return {knowledgePage};
})();
const { knowledgePage } = knowledgeModule;

const settingsModule = (function(){
function settingsPage() {
 const prefs = read("preferences", {compact:false, animations:true});
 return `<section class="page-intro"><div class="eyebrow"><span class="eyebrow-line"></span> PERSONAL SPACE</div><h1>Настрой под <span>себя.</span></h1><p>Управляй внешним видом и сохранёнными данными NEXORA.</p></section>
 <div class="settings-layout"><section class="section-block settings-panel"><div class="settings-section-heading"><span class="settings-big-icon">${icon("settings",20)}</span><div><h2>Внешний вид</h2><p>Настройки отображения интерфейса.</p></div></div><div class="setting-row"><div><b>Тёмная тема</b><p>Графитовый интерфейс с зелёными акцентами.</p></div><button class="setting-switch" id="settingsTheme" role="switch" aria-checked="true" aria-label="Тёмная тема"><span></span></button></div><div class="setting-row"><div><b>Компактные карточки</b><p>Уменьшить внутренние отступы в каталогах.</p></div><button class="setting-switch ${prefs.compact?"on":""}" id="compactToggle" role="switch" aria-checked="${prefs.compact}" aria-label="Компактные карточки"><span></span></button></div><div class="setting-row"><div><b>Плавные анимации</b><p>Переходы и появление элементов интерфейса.</p></div><button class="setting-switch ${prefs.animations?"on":""}" id="animationToggle" role="switch" aria-checked="${prefs.animations}" aria-label="Плавные анимации"><span></span></button></div></section>
 <section class="section-block settings-panel"><div class="settings-section-heading"><span class="settings-big-icon">${icon("settings",20)}</span><div><h2>Данные приложения</h2><p>В первой версии данные хранятся только в этом браузере.</p></div></div><div class="data-info"><span class="data-status"></span><div><b>Локальное хранилище</b><p>Избранное, настройки и сохранённые сценарии.</p></div></div><button class="button button-danger" id="clearData">Очистить данные приложения</button><p class="form-note">Действие удалит локальные настройки и сохранённые сценарии NEXORA. Подтверждение потребуется отдельно.</p></section><section class="section-block settings-panel about-panel"><div class="eyebrow">ABOUT NEXORA</div><h2>Технологии должны освобождать время.</h2><p>NEXORA — демонстрационный проект о полезном применении искусственного интеллекта и автоматизации.</p><div class="about-meta"><span>Версия <b>1.0.0</b></span><span>Режим <b>Локальный MVP</b></span></div></section></div>`;
}
return {settingsPage};
})();
const { settingsPage } = settingsModule;


/* Application entry point */
let activeCategory = "Все";
let catalogQuery = "";
let knowledgeQuery = "";
let currentFlowSteps = ["trigger", "ai", "save"];
let flowName = "Утренний дайджест";
const app = document.querySelector("#app");

function currentRoute() {
 const route = location.hash.replace(/^#\/?/, "").split("?")[0];
 return ["dashboard","tools","automations","calculator","knowledge","settings"].includes(route) ? route : "dashboard";
}
function render() {
 const route = currentRoute();
 const favorites = read("favorites", []);
 let content = "";
 if (route === "dashboard") content = dashboard(favorites);
 if (route === "tools") content = toolsPage(favorites, catalogQuery, activeCategory);
 if (route === "automations") content = automationsPage();
 if (route === "calculator") content = calculatorPage();
 if (route === "knowledge") content = knowledgePage(knowledgeQuery);
 if (route === "settings") content = settingsPage();
 app.innerHTML = shell(route, content, favorites.length);
 document.body.classList.toggle("light-theme", read("theme","dark")==="light");
 document.body.classList.toggle("compact-cards", read("preferences",{compact:false}).compact);
 bindGlobal();
 if (route === "tools") bindCatalog();
 if (route === "calculator") bindCalculator();
 if (route === "automations") bindAutomation();
 if (route === "knowledge") bindKnowledge();
 if (route === "settings") bindSettings();
}

function toast(message, type="success") {
 const region = document.querySelector("#toastRegion");
 if (!region) return;
 const item = document.createElement("div");
 item.className = `toast toast-${type}`;
 item.innerHTML = `<span>${type === "error" ? "!" : "✓"}</span><p>${escapeHtml(message)}</p>`;
 region.append(item);
 setTimeout(() => item.remove(), 3200);
}
function bindGlobal() {
 document.querySelectorAll("[data-favorite]").forEach(btn => btn.addEventListener("click", e => {
   e.preventDefault(); e.stopPropagation();
   const id = Number(btn.dataset.favorite);
   const favorites = read("favorites", []);
   const next = favorites.includes(id) ? favorites.filter(x=>x!==id) : [...favorites,id];
   write("favorites", next); render(); toast(next.includes(id) ? "Добавлено в избранное" : "Удалено из избранного");
 }));
 document.querySelectorAll("[data-tool-open]").forEach(btn => btn.addEventListener("click", e => { e.preventDefault(); openTool(Number(btn.dataset.toolOpen)); }));
 document.querySelector("#themeToggle")?.addEventListener("click", () => {
   const next = read("theme","dark")==="dark" ? "light" : "dark"; write("theme",next); render(); toast(next==="light"?"Включена светлая тема":"Включена тёмная тема");
 });
 document.querySelector("#menuToggle")?.addEventListener("click", () => document.body.classList.toggle("menu-open"));
 document.querySelector("#mobileScrim")?.addEventListener("click", () => document.body.classList.remove("menu-open"));
 document.querySelectorAll(".side-nav .nav-link, .sidebar-bottom .nav-link").forEach(a=>a.addEventListener("click",()=>document.body.classList.remove("menu-open")));
 document.querySelector("#globalSearch")?.addEventListener("keydown", e => {
   if (e.key === "Enter") { catalogQuery=e.target.value; activeCategory="Все"; location.hash="#tools"; render(); }
 });
 document.querySelector("#notificationButton")?.addEventListener("click", () => toast("Пока новых уведомлений нет"));
 document.querySelector("#resetCatalog")?.addEventListener("click",()=>{catalogQuery="";activeCategory="Все";render();});
 document.addEventListener("keydown", globalKeyHandler, {once:true});
}
function globalKeyHandler(e) {
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase()==="k") { e.preventDefault(); document.querySelector("#globalSearch")?.focus(); }
 if (e.key === "Escape") { closeModal(); document.body.classList.remove("menu-open"); }
}
function bindCatalog() {
 const search = document.querySelector("#catalogSearch");
 search?.addEventListener("input", e => {
   const pos=e.target.selectionStart; catalogQuery=e.target.value;
   const y=window.scrollY;
   render();
   const next=document.querySelector("#catalogSearch"); next?.focus(); next?.setSelectionRange(pos,pos); window.scrollTo(0,y);
 });
 document.querySelector("#categoryFilter")?.addEventListener("change", e=>{activeCategory=e.target.value;render();});
}
function bindCalculator() {
 const ranges = ["tasks","minutes","repeat","percent"];
 const format = () => {
  const tasks=Number(document.querySelector("#tasksRange").value);
  const minutes=Number(document.querySelector("#minutesRange").value);
  const repeat=Number(document.querySelector("#repeatRange").value);
  const percent=Number(document.querySelector("#percentRange").value);
  document.querySelector("#tasksOutput").textContent=`${tasks} ${plural(tasks,"задача","задачи","задач")}`;
  document.querySelector("#minutesOutput").textContent=`${minutes} ${plural(minutes,"минута","минуты","минут")}`;
  document.querySelector("#repeatOutput").textContent=`${repeat} ${plural(repeat,"раз","раза","раз")}`;
  document.querySelector("#percentOutput").textContent=`${percent}%`;
  const weekly=tasks*minutes*repeat*percent/100/60;
  document.querySelector("#weeklyHours").textContent=weekly.toLocaleString("ru-RU",{maximumFractionDigits:1,minimumFractionDigits:1});
  document.querySelector("#monthlyHours").textContent=`${(weekly*52/12).toLocaleString("ru-RU",{maximumFractionDigits:1})} ч`;
  document.querySelector("#yearlyHours").textContent=`${Math.round(weekly*52).toLocaleString("ru-RU")} ч`;
 };
 ranges.forEach(k=>document.querySelector(`#${k}Range`)?.addEventListener("input",format));
 format();
 document.querySelector("#saveCalculation")?.addEventListener("click",()=>{
  const result={tasks:Number(document.querySelector("#tasksRange").value),minutes:Number(document.querySelector("#minutesRange").value),repeat:Number(document.querySelector("#repeatRange").value),percent:Number(document.querySelector("#percentRange").value),savedAt:new Date().toISOString()};
  const history=read("calculations",[]);history.unshift(result);write("calculations",history.slice(0,20));toast("Расчёт сохранён в истории");
 });
}
function bindAutomation() {
 const canvas=document.querySelector("#workflowCanvas");
 const renderSteps=()=>{
  const labels={trigger:["По расписанию","Триггер · Каждый день, 09:00","trigger-node","clock"],ai:["Подготовить сводку","Действие · Обработка информации","ai-node","spark"],save:["Сохранить результат","Действие · Заметка","save-node","book"]};
  canvas.querySelectorAll(".workflow-node,.node-link").forEach(el=>el.remove());
  const caption=canvas.querySelector(".canvas-caption");
  currentFlowSteps.forEach((type,index)=>{
   const [name,desc,cls,glyph]=labels[type]||labels.ai;
   const node=document.createElement("div");node.className=`workflow-node ${cls}`;node.dataset.node=type;
   node.innerHTML=`<span class="workflow-node-icon">${icon(glyph,17)}</span><div><b>${name}</b><small>${desc}</small></div><button class="node-menu" data-remove-node="${index}" aria-label="Удалить блок">×</button>`;
   canvas.insertBefore(node,caption);
   if(index<currentFlowSteps.length-1){const link=document.createElement("div");link.className="node-link";link.innerHTML="<span></span>";canvas.insertBefore(link,caption);}
  });
  canvas.querySelectorAll("[data-remove-node]").forEach(b=>b.addEventListener("click",()=>{currentFlowSteps.splice(Number(b.dataset.removeNode),1);renderSteps();}));
 };
 renderSteps();
 document.querySelector("#newFlow")?.addEventListener("click",()=>{flowName="Новый сценарий";document.querySelector("#flowTitle").textContent=flowName;currentFlowSteps=["trigger","ai"];renderSteps();toast("Создан новый черновик");});
 document.querySelector("#addFlowStep")?.addEventListener("click",()=>{currentFlowSteps.push("ai");renderSteps();toast("Добавлен шаг ИИ-действия");});
 document.querySelectorAll("[data-add-type]").forEach(b=>b.addEventListener("click",()=>{currentFlowSteps.push(b.dataset.addType);renderSteps();toast("Блок добавлен в схему");}));
 document.querySelector("#saveFlow")?.addEventListener("click",()=>{
  const name=prompt("Название сценария:",flowName);
  if(name===null)return;
  const clean=name.trim()||"Без названия";
  const flows=read("flows",[]);flows.unshift({name:clean,steps:currentFlowSteps.length,types:[...currentFlowSteps],savedAt:new Date().toISOString()});write("flows",flows.slice(0,30));toast("Сценарий сохранён");render();
 });
 document.querySelectorAll("[data-delete-flow]").forEach(b=>b.addEventListener("click",()=>{const flows=read("flows",[]);flows.splice(Number(b.dataset.deleteFlow),1);write("flows",flows);render();toast("Сценарий удалён");}));
}
function bindKnowledge() {
 const input=document.querySelector("#knowledgeSearch");
 input?.addEventListener("input",e=>{const pos=e.target.selectionStart;knowledgeQuery=e.target.value;render();const n=document.querySelector("#knowledgeSearch");n?.focus();n?.setSelectionRange(pos,pos);});
 document.querySelectorAll("[data-article]").forEach(b=>b.addEventListener("click",()=>openArticle(Number(b.dataset.article))));
 document.querySelector("#featuredArticle")?.addEventListener("click",e=>{e.preventDefault();openArticle(1);});
}
function bindSettings() {
 document.querySelector("#settingsTheme")?.addEventListener("click",()=>{const next=read("theme","dark")==="dark"?"light":"dark";write("theme",next);render();});
 const prefs=read("preferences",{compact:false,animations:true});
 document.querySelector("#compactToggle")?.addEventListener("click",()=>{prefs.compact=!prefs.compact;write("preferences",prefs);render();toast("Настройки отображения обновлены");});
 document.querySelector("#animationToggle")?.addEventListener("click",()=>{prefs.animations=!prefs.animations;write("preferences",prefs);document.body.classList.toggle("reduce-motion",!prefs.animations);render();toast("Настройки анимации обновлены");});
 document.querySelector("#clearData")?.addEventListener("click",()=>confirm("Удалить избранное, настройки и сохранённые сценарии NEXORA?")&&clearNexoraData());
}
function openTool(id) {
 const t=tools.find(x=>x.id===id);if(!t)return;
 showModal(`<div class="modal-tool-heading"><span class="tool-mark ${t.color}">${t.mark}</span><div><span class="eyebrow">${escapeHtml(t.category)}</span><h2>${escapeHtml(t.name)}</h2></div></div><p>${escapeHtml(t.description)}</p><div class="modal-note">Описание и ссылка приведены для ознакомления. NEXORA не связана с указанным сервисом.</div><div class="modal-actions"><button class="button button-secondary" data-close-modal>Закрыть</button><a class="button button-primary" href="${t.url}" target="_blank" rel="noopener noreferrer">Открыть сервис ${icon("external",15)}</a></div>`);
}
function openArticle(id) {
 const a=articles.find(x=>x.id===id);if(!a)return;
 showModal(`<div class="eyebrow">${escapeHtml(a.category)} · ${a.read}</div><h2 class="article-modal-title">${escapeHtml(a.title)}</h2><p class="article-modal-lead">${escapeHtml(a.summary)}</p><div class="article-body"><p>Начни с наблюдения: какие действия ты повторяешь каждый день или каждую неделю? Выпиши их и отметь те, у которых понятный результат и предсказуемые шаги.</p><h3>Три шага к более умному процессу</h3><ol><li><b>Определи задачу.</b> Сформулируй, что именно хочется упростить и какой результат нужен.</li><li><b>Выбери подходящий инструмент.</b> Сравни удобство, стоимость, ограничения и политику обработки данных.</li><li><b>Проверь результат.</b> Начни с небольшого теста, проверь качество и оставь возможность ручного контроля.</li></ol><p>Не всякая задача нуждается в автоматизации. Хороший процесс делает работу понятнее, надёжнее и удобнее.</p></div><div class="modal-actions"><button class="button button-primary" data-close-modal>Понятно ${icon("check",15)}</button></div>`);
}
function showModal(html) {
 const root=document.querySelector("#modalRoot");if(!root)return;
 root.innerHTML=`<div class="modal-backdrop" id="modalBackdrop"><section class="modal-card" role="dialog" aria-modal="true">${icon("close",0)}<button class="modal-close" data-close-modal aria-label="Закрыть">${icon("close",18)}</button><div class="modal-content">${html}</div></section></div>`;
 root.querySelector("#modalBackdrop").addEventListener("click",e=>{if(e.target.id==="modalBackdrop")closeModal();});
 root.querySelectorAll("[data-close-modal]").forEach(b=>b.addEventListener("click",closeModal));
}
function closeModal(){const root=document.querySelector("#modalRoot");if(root)root.innerHTML="";}
function clearNexoraData() {
 for(const key of Object.keys(localStorage)) if(key.startsWith("nexora:"))localStorage.removeItem(key);
 render();toast("Локальные данные NEXORA очищены");
}
function plural(n,one,few,many){const n10=n%10,n100=n%100;if(n10===1&&n100!==11)return one;if(n10>=2&&n10<=4&&(n100<12||n100>14))return few;return many;}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
window.addEventListener("hashchange",()=>{render();window.scrollTo(0,0);});
if(!location.hash) location.hash="#dashboard";
render();
