const studio = {
  name: "Northstar Animation",
  locations: ["Sydney", "Brisbane", "Los Angeles"],
};

const productions = [
  {
    id: "harbor-heroes",
    title: "Harbor Heroes · Season 2",
    type: "service",
    typeLabel: "Service production",
    client: "StreamWave Kids",
    status: "Completed",
    locations: ["Sydney", "Los Angeles"],
    owner: "Client-controlled materials",
    reuse: "Cross-production use requires written client approval",
    agreement: "PSA-2024-017",
    aiPosition: "Same-show workflow assistance only",
  },
  {
    id: "moss-moon",
    title: "Moss & Moon",
    type: "internal",
    typeLabel: "Northstar original",
    client: "Northstar Animation",
    status: "In production",
    locations: ["Sydney", "Brisbane"],
    owner: "Northstar-owned IP and production assets",
    reuse: "Internal R&D permitted where contributor rights are cleared",
    agreement: "NIP-2026-004",
    aiPosition: "Approved internal experimentation programme",
  },
  {
    id: "sky-harbor",
    title: "Sky Harbor",
    type: "coproduction",
    typeLabel: "Co-production",
    client: "BrightArc Media",
    status: "Pre-production",
    locations: ["Brisbane", "Los Angeles"],
    owner: "Jointly controlled production materials",
    reuse: "Partner approval required outside the production",
    agreement: "COP-2026-009",
    aiPosition: "Project-specific approvals only",
  },
  {
    id: "tiny-titans",
    title: "Tiny Titans",
    type: "service",
    typeLabel: "Service production",
    client: "Kitebox Studios",
    status: "In production",
    locations: ["Brisbane", "Los Angeles"],
    owner: "Client owns show assets; Northstar retains background tools",
    reuse: "Show assets confined to this production",
    agreement: "PSA-2025-031",
    aiPosition: "Approved tools listed in show security plan",
  },
];

const materials = [
  { id: "voice", label: "Performer voice recordings", sensitivity: "Performer rights", owner: "Casting & Legal" },
  { id: "video", label: "Voice-record video / likeness", sensitivity: "Voice and likeness", owner: "Casting & Legal" },
  { id: "script", label: "Scripts and story documents", sensitivity: "Unreleased creative", owner: "Production" },
  { id: "client-notes", label: "Client notes in ShotGrid", sensitivity: "Client confidential", owner: "Production" },
  { id: "production-data", label: "ShotGrid tasks, statuses and versions", sensitivity: "Production confidential", owner: "Production Technology" },
  { id: "art", label: "Concept art and designs", sensitivity: "Creative rights", owner: "Art Department" },
  { id: "rigs", label: "Rigs, tools and source code", sensitivity: "Company / show IP", owner: "Technology" },
  { id: "comms", label: "Internal email, Chat and Spaces", sensitivity: "Internal / personal data", owner: "Information Governance" },
];

const operations = [
  { id: "summarise", label: "Summarise or transcribe", persistence: "Task-specific output" },
  { id: "search", label: "Index for search or retrieval", persistence: "Persistent derived store" },
  { id: "analyse", label: "Analyse patterns or classify", persistence: "Analysis output" },
  { id: "generate", label: "Generate or transform material", persistence: "New creative output" },
  { id: "train", label: "Train or fine-tune a model", persistence: "Persistent model capability" },
  { id: "automate", label: "Automate an action or decision", persistence: "Operational consequence" },
];

const purposes = [
  { id: "same-task", label: "Complete this task", detail: "Task-specific internal output" },
  { id: "same-show", label: "Use on the same production", detail: "Show-specific output" },
  { id: "different-show", label: "Use on another production", detail: "Cross-production reuse" },
  { id: "company-capability", label: "Create a reusable company capability", detail: "Model, dataset or system" },
  { id: "client-delivery", label: "Deliver to a client", detail: "External production output" },
  { id: "public", label: "Publish externally", detail: "Public or marketing output" },
];

const tools = [
  {
    id: "studio-lm",
    name: "StudioLM Private",
    scope: "Company-approved",
    hosting: "Northstar private environment",
    retention: "Company-controlled",
    providerTraining: "None",
    approvedFor: ["summarise", "search", "analyse"],
    excludes: ["voice", "video"],
  },
  {
    id: "motionmap",
    name: "MotionMap Lab",
    scope: "Show-approved",
    hosting: "Isolated vendor tenant",
    retention: "30-day source deletion",
    providerTraining: "Contractually disabled",
    approvedFor: ["analyse", "generate", "train"],
    excludes: [],
  },
  {
    id: "notepilot",
    name: "NotePilot Enterprise",
    scope: "Company-approved",
    hosting: "Enterprise workspace",
    retention: "90-day admin retention",
    providerTraining: "Contractually disabled",
    approvedFor: ["summarise", "analyse"],
    excludes: ["voice", "video", "art", "rigs"],
  },
  {
    id: "framefoundry",
    name: "FrameFoundry Studio",
    scope: "Show-approved",
    hosting: "Dedicated creative tenant",
    retention: "14-day input retention",
    providerTraining: "Contractually disabled",
    approvedFor: ["generate"],
    excludes: ["voice", "video", "comms", "rigs"],
  },
];

const contributors = [
  { name: "Ava Lin", production: "Harbor Heroes · Season 2", role: "Lead voice performer", location: "Sydney", agreement: "Australian Voice Performers Collective 2024 · sample", training: "Individual approval required", status: "review" },
  { name: "Mateo Ruiz", production: "Harbor Heroes · Season 2", role: "Voice performer", location: "Los Angeles", agreement: "US Screen Voice Agreement 2023 · sample", training: "Synthetic performance restricted", status: "restricted" },
  { name: "Nia Okafor", production: "Moss & Moon", role: "Lead voice performer", location: "Brisbane", agreement: "Northstar Performer Agreement 2026 · sample", training: "Lip-sync research permitted with conditions", status: "approved" },
  { name: "Eli Tran", production: "Sky Harbor", role: "Concept artist", location: "Sydney", agreement: "Co-production Artist Agreement · sample", training: "Partner and contributor approval required", status: "review" },
];

const dataDomains = [
  { domain: "Productions", fields: "Client, ownership, locations, status, governing agreement, reuse position", entered: "Production Operations", verified: "Business & Legal Affairs", trigger: "Greenlight, contract amendment, wrap" },
  { domain: "Agreements", fields: "Parties, clauses, jurisdiction, dates, permitted uses, restrictions", entered: "Business & Legal Affairs", verified: "Legal counsel", trigger: "Execution, amendment, renewal" },
  { domain: "Contributor rights", fields: "Role, production, contract, collective terms, consent, use boundaries", entered: "Casting / People & Culture", verified: "Business & Legal Affairs", trigger: "Engagement, rider, withdrawal" },
  { domain: "Material register", fields: "Type, production, owners, contributors, sensitivity, storage location", entered: "Production data steward", verified: "Production Technology", trigger: "Ingest, transfer, archive" },
  { domain: "AI activities", fields: "Operation, purpose, output, persistence, affected people", entered: "Requesting team", verified: "AI Governance", trigger: "New or materially changed use" },
  { domain: "Approved tools", fields: "Account, hosting, retention, provider training, security, approved scope", entered: "IT & Security", verified: "Legal + AI Governance", trigger: "Vendor or configuration change" },
  { domain: "Rules and decisions", fields: "Outcome, conditions, rationale, authority, evidence, review date", entered: "Decision owner", verified: "Legal / policy owner", trigger: "Decision, appeal, policy change" },
];

const decisions = [
  { date: "12 Sep 2026", title: "Meeting transcript summary for Tiny Titans", detail: "Internal review transcript · same-show workflow · NotePilot", status: "Approved", statusClass: "approved", owner: "Information Governance" },
  { date: "08 Sep 2026", title: "Harbor Heroes voice data for reusable lip-sync model", detail: "Cross-production training · mixed performer agreements", status: "Review required", statusClass: "review", owner: "Business & Legal Affairs" },
  { date: "02 Sep 2026", title: "Moss & Moon concept exploration", detail: "Company-owned art · same-show generation · FrameFoundry", status: "Conditional", statusClass: "approved", owner: "Creative Technology" },
  { date: "29 Aug 2026", title: "Client review notes for management model training", detail: "Client-confidential notes · reusable company capability", status: "Restricted", statusClass: "restricted", owner: "Business & Legal Affairs" },
];

const scenarios = {
  "voice-cross-show": { production: "harbor-heroes", material: "voice", operation: "train", purpose: "different-show", tool: "motionmap" },
  "meeting-summary": { production: "tiny-titans", material: "comms", operation: "summarise", purpose: "same-task", tool: "notepilot" },
  "internal-concepts": { production: "moss-moon", material: "art", operation: "generate", purpose: "same-show", tool: "framefoundry" },
};

let activeView = "check";
let recordFilter = "all";

function optionList(items, valueKey = "id", labelKey = "label") {
  return items.map(item => `<option value="${item[valueKey]}">${item[labelKey]}</option>`).join("");
}

function statusLabel(type) {
  return type === "service" ? "Service" : type === "internal" ? "Internal IP" : "Co-production";
}

function appTemplate() {
  return `
    <div class="shell">
      <aside class="sidebar">
        <div class="brand"><div class="brand-mark" aria-hidden="true">S</div><div class="brand-copy"><strong>SCOPE</strong><span class="brand-definition">Source · Contracts · Operation<br>Purpose · Environment</span></div></div>
        <nav class="nav-list" aria-label="Primary">
          <button class="nav-button active" data-view="check"><span class="nav-icon">01</span><span>Run a check</span></button>
          <button class="nav-button" data-view="records"><span class="nav-icon">02</span><span>Rights library</span></button>
          <button class="nav-button" data-view="data"><span class="nav-icon">03</span><span>Data model</span></button>
          <button class="nav-button" data-view="decisions"><span class="nav-icon">04</span><span>Decisions</span></button>
        </nav>
        <div class="studio-card"><strong>${studio.name}</strong><span>Fictional prototype data</span><div class="studio-locations" aria-label="Three studio locations"><i></i><i></i><i></i></div></div>
      </aside>
      <main class="main">
        <header class="topbar">
          <div class="topbar-title"><strong>Northstar policy workspace</strong><span>Sample environment · v0.1</span></div>
          <div class="profile"><div class="avatar">AL</div><div class="profile-copy"><strong>Alex Lee</strong><span>AI Governance</span></div></div>
        </header>
        <div class="content">
          ${checkView()}
          ${recordsView()}
          ${dataView()}
          ${decisionsView()}
        </div>
      </main>
    </div>`;
}

function checkView() {
  return `
    <section class="view active" id="view-check">
      <div class="page-heading"><div><p class="eyebrow">Decision support</p><h1>Can I use this with AI?</h1><p class="scope-expansion">Source · Contracts & contributors · Operation · Purpose · Environment</p><p class="page-description">Describe the proposed use. SCOPE will show the applicable policy position and decision owner.</p></div><span class="badge">Policy data current</span></div>
      <div class="stats">
        <div class="stat"><div class="stat-label">Productions mapped</div><div class="stat-value"><strong>4</strong><span>3 locations</span></div></div>
        <div class="stat"><div class="stat-label">Contributor records</div><div class="stat-value"><strong>146</strong><span>8 need review</span></div></div>
        <div class="stat"><div class="stat-label">Approved tools</div><div class="stat-value"><strong>4</strong><span>2 show-specific</span></div></div>
        <div class="stat"><div class="stat-label">Open decisions</div><div class="stat-value"><strong>6</strong><span>Legal queue</span></div></div>
      </div>
      <div class="checker-grid">
        <section class="panel">
          <div class="panel-head"><div><h2>SCOPE check</h2><p>Choose a sample scenario or change any field.</p></div><span class="tag">Fictional data</span></div>
          <div class="scenario-row" aria-label="Sample scenarios">
            <button class="scenario-button" data-scenario="voice-cross-show">Voice data → lip-sync model</button>
            <button class="scenario-button" data-scenario="meeting-summary">Summarise a meeting</button>
            <button class="scenario-button" data-scenario="internal-concepts">Internal concept generation</button>
          </div>
          <form class="form-body" id="scope-form">
            <div class="scope-field"><div class="scope-letter">S</div><div><div class="scope-label"><label for="source">Source</label><span>Origin and material</span></div><div class="select-stack"><select id="source" aria-label="Source production">${optionList(productions, "id", "title")}</select><select id="material" aria-label="Material type">${optionList(materials)}</select></div></div></div>
            <div class="scope-field"><div class="scope-letter">C</div><div><div class="scope-label"><label for="contributors">Contracts & contributors</label><span>Resolved from the source</span></div><div class="select-stack one"><select id="contributors" aria-label="Contracts and contributors"><option value="all">All contributors represented in the material</option><option value="cleared">Only contributors already cleared for this use</option><option value="unknown">Contributor identities or terms are incomplete</option></select></div></div></div>
            <div class="scope-field"><div class="scope-letter">O</div><div><div class="scope-label"><label for="operation">Operation</label><span>What the AI will do</span></div><div class="select-stack one"><select id="operation">${optionList(operations)}</select></div></div></div>
            <div class="scope-field"><div class="scope-letter">P</div><div><div class="scope-label"><label for="purpose">Purpose</label><span>Where the result will be used</span></div><div class="select-stack one"><select id="purpose">${optionList(purposes)}</select></div></div></div>
            <div class="scope-field"><div class="scope-letter">E</div><div><div class="scope-label"><label for="tool">Environment</label><span>Approved account and controls</span></div><div class="select-stack one"><select id="tool">${optionList(tools, "id", "name")}</select></div></div></div>
            <button class="primary-button" type="submit">Check this use</button>
          </form>
        </section>
        <aside class="panel result-card" aria-live="polite" id="result-card"></aside>
      </div>
    </section>`;
}

function recordsView() {
  return `
    <section class="view" id="view-records">
      <div class="page-heading"><div><p class="eyebrow">Rights library</p><h1>The records behind each answer</h1><p>Production, contributor and tool records are maintained once, then reused across every SCOPE check.</p></div><span class="badge">Sample register</span></div>
      <div class="toolbar"><input class="search-input" id="record-search" type="search" placeholder="Search productions…" aria-label="Search productions"><button class="filter-button active" data-filter="all">All</button><button class="filter-button" data-filter="service">Service</button><button class="filter-button" data-filter="internal">Internal</button><button class="filter-button" data-filter="coproduction">Co-production</button></div>
      <div class="record-grid" id="production-grid">${productionCards(productions)}</div>
      <div class="section-block"><div class="section-title"><h2>Contributor rights</h2><p>Examples show how people on one production can carry different permissions.</p></div>${contributorTable()}</div>
      <div class="section-block"><div class="section-title"><h2>Approved environments</h2><p>Approval belongs to a specific account, configuration and use.</p></div>${toolTable()}</div>
    </section>`;
}

function productionCards(items) {
  return items.map(p => `<article class="record-card"><div class="record-top"><div><h3>${p.title}</h3><p>${p.client} · ${p.status}</p></div><span class="status-chip ${p.type}">${statusLabel(p.type)}</span></div><div class="meta-grid"><div class="meta"><span>Rights position</span><strong>${p.owner}</strong></div><div class="meta"><span>AI position</span><strong>${p.aiPosition}</strong></div><div class="meta"><span>Cross-show reuse</span><strong>${p.reuse}</strong></div><div class="meta"><span>Governing record</span><strong>${p.agreement}</strong></div></div><div class="tag-row">${p.locations.map(x => `<span class="tag">${x}</span>`).join("")}</div></article>`).join("");
}

function contributorTable() {
  return `<div class="table-wrap"><table><thead><tr><th>Contributor</th><th>Production</th><th>Agreement</th><th>Model training position</th></tr></thead><tbody>${contributors.map(c => `<tr><td><strong>${c.name}</strong><small>${c.role} · ${c.location}</small></td><td>${c.production}</td><td>${c.agreement}</td><td><span class="status-chip ${c.status}">${c.training}</span></td></tr>`).join("")}</tbody></table></div>`;
}

function toolTable() {
  return `<div class="table-wrap"><table><thead><tr><th>Environment</th><th>Approval</th><th>Hosting</th><th>Retention</th><th>Provider training</th></tr></thead><tbody>${tools.map(t => `<tr><td><strong>${t.name}</strong></td><td>${t.scope}</td><td>${t.hosting}</td><td>${t.retention}</td><td>${t.providerTraining}</td></tr>`).join("")}</tbody></table></div>`;
}

function dataView() {
  return `
    <section class="view" id="view-data">
      <div class="page-heading"><div><p class="eyebrow">Operating model</p><h1>Who enters what?</h1><p>The prototype separates source records from legal verification and decision ownership, so each fact is maintained by the team closest to it.</p></div><span class="badge">7 data domains</span></div>
      <div class="flow">
        <div class="flow-step"><b>S</b><strong>Source records</strong><span>Production, client, material and ownership context</span></div>
        <div class="flow-step"><b>C</b><strong>Rights records</strong><span>Contracts, contributors, consent and collective terms</span></div>
        <div class="flow-step"><b>O</b><strong>Activity catalogue</strong><span>What the system does and what persists</span></div>
        <div class="flow-step"><b>P</b><strong>Use boundaries</strong><span>Task, show, cross-show, reusable or public</span></div>
        <div class="flow-step"><b>E</b><strong>Tool register</strong><span>Approved accounts, retention and security controls</span></div>
      </div>
      <div class="table-wrap"><table><thead><tr><th>Data domain</th><th>Required information</th><th>Entered by</th><th>Verified by</th><th>Review trigger</th></tr></thead><tbody>${dataDomains.map(d => `<tr><td><strong>${d.domain}</strong></td><td>${d.fields}</td><td>${d.entered}</td><td>${d.verified}</td><td>${d.trigger}</td></tr>`).join("")}</tbody></table></div>
      <div class="section-block note"><strong>Design principle:</strong> SCOPE stores each rights fact once and links it to the relevant productions, people, materials and agreements. Unknown remains an explicit state and routes the use to the named decision owner.</div>
    </section>`;
}

function decisionsView() {
  return `
    <section class="view" id="view-decisions">
      <div class="page-heading"><div><p class="eyebrow">Decision history</p><h1>Auditable answers</h1><p>Every outcome records the question, applicable rule, responsible owner and policy version used at the time.</p></div><span class="badge">4 sample decisions</span></div>
      <div class="decision-list">${decisions.map(d => `<article class="decision-row"><time>${d.date}</time><div class="decision-copy"><strong>${d.title}</strong><span>${d.detail}</span></div><div class="decision-owner">${d.owner}</div><span class="status-chip ${d.statusClass}">${d.status}</span></article>`).join("")}</div>
      <div class="section-block"><div class="section-title"><h2>What the audit record preserves</h2><p>Enough context to explain and reproduce an answer later.</p></div><div class="record-grid"><article class="record-card"><h3>Decision evidence</h3><p>Matched production, contracts, contributor records, policy rules and tool configuration.</p><div class="tag-row"><span class="tag">Source IDs</span><span class="tag">Clause references</span><span class="tag">Rule version</span></div></article><article class="record-card"><h3>Decision lifecycle</h3><p>Requester, approver, conditions, effective period, review trigger and superseding decisions.</p><div class="tag-row"><span class="tag">Owner</span><span class="tag">Review date</span><span class="tag">Change history</span></div></article></div></div>
    </section>`;
}

function evaluate(selection) {
  const source = productions.find(x => x.id === selection.production);
  const material = materials.find(x => x.id === selection.material);
  const operation = operations.find(x => x.id === selection.operation);
  const purpose = purposes.find(x => x.id === selection.purpose);
  const tool = tools.find(x => x.id === selection.tool);
  const factors = [];
  let level = 0;
  let owner = "AI Governance";
  let rule = "SCOPE-GEN-001";

  factors.push({ title: source.typeLabel, text: source.owner });
  factors.push({ title: material.label, text: material.sensitivity });
  factors.push({ title: operation.label, text: operation.persistence });
  factors.push({ title: purpose.label, text: purpose.detail });

  if (!tool.approvedFor.includes(operation.id) || tool.excludes.includes(material.id)) {
    level = 3;
    owner = "IT, Security & AI Governance";
    rule = "SCOPE-ENV-004";
    factors.push({ title: "Environment outside approval", text: `${tool.name} is not approved for this material and operation.` });
  }

  if (selection.contributors === "unknown") {
    level = Math.max(level, 2);
    owner = "Business & Legal Affairs";
    rule = "SCOPE-RGT-002";
    factors.push({ title: "Contributor terms incomplete", text: "The people represented in the material must be identified and linked to rights records." });
  }

  if (["voice", "video"].includes(material.id) && ["train", "generate"].includes(operation.id)) {
    level = Math.max(level, 2);
    owner = "Business & Legal Affairs + Casting";
    rule = "SCOPE-PERF-017";
    factors.push({ title: "Performer rights apply", text: "Individual and collective terms must permit the proposed model use." });
  }

  if (["service", "coproduction"].includes(source.type) && ["different-show", "company-capability", "public"].includes(purpose.id)) {
    level = Math.max(level, 2);
    owner = "Business & Legal Affairs";
    rule = "SCOPE-XPR-011";
    factors.push({ title: "Use crosses the production boundary", text: source.reuse });
  }

  if (operation.id === "train" && purpose.id === "company-capability") {
    level = Math.max(level, 1);
    factors.push({ title: "Persistent reusable capability", text: "Source restrictions must carry into the model record and approved-use scope." });
  }

  if (source.type === "internal" && selection.contributors === "cleared" && tool.approvedFor.includes(operation.id) && !tool.excludes.includes(material.id)) {
    if (["same-task", "same-show"].includes(purpose.id)) {
      level = operation.id === "generate" ? Math.max(level, 1) : level;
      rule = operation.id === "generate" ? "SCOPE-INT-006" : "SCOPE-INT-003";
      owner = operation.id === "generate" ? "Creative Technology" : "AI Governance";
    }
  }

  if (source.type === "service" && purpose.id === "same-show" && ["summarise", "analyse"].includes(operation.id) && tool.approvedFor.includes(operation.id)) {
    level = Math.min(level, 1);
    rule = "SCOPE-SVC-005";
    owner = "Production + Information Governance";
  }

  const outputs = [
    { key: "approved", title: "Approved", symbol: "✓", summary: "The current records support this use in the selected environment." },
    { key: "conditional", title: "Approved with conditions", symbol: "≈", summary: "This use can proceed when the listed scope and handling conditions are applied." },
    { key: "review", title: "Review required", symbol: "!", summary: "Existing records do not provide sufficient permission for this use. The named owner must decide before work begins." },
    { key: "restricted", title: "Restricted", symbol: "×", summary: "The selected environment or recorded rights position prevents this use as described." },
  ];
  return { ...outputs[level], factors, owner, rule, tool, source };
}

function renderResult(result) {
  document.getElementById("result-card").innerHTML = `
    <div class="result-top ${result.key}"><div class="result-kicker">SCOPE outcome</div><div class="result-status"><div class="result-icon">${result.symbol}</div><h2>${result.title}</h2></div><p class="result-summary">${result.summary}</p></div>
    <div class="result-body">
      <section class="result-section"><h3>Factors considered</h3><div class="factor-list">${result.factors.map((f, i) => `<div class="factor"><div class="factor-icon">${i + 1}</div><div><strong>${f.title}</strong><span>${f.text}</span></div></div>`).join("")}</div></section>
      <section class="result-section"><h3>Decision owner</h3><div class="owner-box"><strong>${result.owner}</strong><span>${result.key === "review" || result.key === "restricted" ? "Submit the proposed use with the linked source records." : "Conditions are recorded against this use case."}</span></div></section>
      <section class="result-section"><div class="rule-ref"><span>Matched rule</span><strong>${result.rule}</strong></div><div class="rule-ref"><span>Environment</span><strong>${result.tool.name}</strong></div><div class="rule-ref"><span>Policy version</span><strong>0.1 · sample</strong></div></section>
    </div>`;
}

function currentSelection() {
  return {
    production: document.getElementById("source").value,
    material: document.getElementById("material").value,
    contributors: document.getElementById("contributors").value,
    operation: document.getElementById("operation").value,
    purpose: document.getElementById("purpose").value,
    tool: document.getElementById("tool").value,
  };
}

function setScenario(id) {
  const s = scenarios[id];
  if (!s) return;
  Object.entries(s).forEach(([key, value]) => {
    const elementId = key === "production" ? "source" : key;
    document.getElementById(elementId).value = value;
  });
  document.getElementById("contributors").value = id === "internal-concepts" ? "cleared" : "all";
  renderResult(evaluate(currentSelection()));
}

function bindEvents() {
  document.querySelectorAll(".nav-button").forEach(button => button.addEventListener("click", () => {
    activeView = button.dataset.view;
    document.querySelectorAll(".nav-button").forEach(x => x.classList.toggle("active", x === button));
    document.querySelectorAll(".view").forEach(x => x.classList.toggle("active", x.id === `view-${activeView}`));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }));

  document.getElementById("scope-form").addEventListener("submit", event => {
    event.preventDefault();
    renderResult(evaluate(currentSelection()));
  });
  document.querySelectorAll("#scope-form select").forEach(select => select.addEventListener("change", () => renderResult(evaluate(currentSelection()))));
  document.querySelectorAll("[data-scenario]").forEach(button => button.addEventListener("click", () => setScenario(button.dataset.scenario)));

  function filterRecords() {
    const query = document.getElementById("record-search").value.trim().toLowerCase();
    const filtered = productions.filter(p => (recordFilter === "all" || p.type === recordFilter) && `${p.title} ${p.client} ${p.locations.join(" ")}`.toLowerCase().includes(query));
    document.getElementById("production-grid").innerHTML = filtered.length ? productionCards(filtered) : `<div class="note">No production records match this search.</div>`;
  }
  document.getElementById("record-search").addEventListener("input", filterRecords);
  document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => {
    recordFilter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach(x => x.classList.toggle("active", x === button));
    filterRecords();
  }));
}

document.getElementById("app").innerHTML = appTemplate();
bindEvents();
setScenario("voice-cross-show");

function registerWebMcp() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const valid = {
    production: new Set(productions.map(x => x.id)),
    material: new Set(materials.map(x => x.id)),
    operation: new Set(operations.map(x => x.id)),
    purpose: new Set(purposes.map(x => x.id)),
    tool: new Set(tools.map(x => x.id)),
    contributors: new Set(["all", "cleared", "unknown"]),
  };
  const lifecycle = new AbortController();
  try {
    void Promise.resolve(context.registerTool({
      name: "run_scope_check",
      title: "Run a SCOPE check",
      description: "Evaluate a proposed AI use against the fictional Northstar Animation rights records and update the visible SCOPE decision. Production IDs: harbor-heroes, moss-moon, sky-harbor, tiny-titans. Material IDs: voice, video, script, client-notes, production-data, art, rigs, comms. Operation IDs: summarise, search, analyse, generate, train, automate. Purpose IDs: same-task, same-show, different-show, company-capability, client-delivery, public. Tool IDs: studio-lm, motionmap, notepilot, framefoundry.",
      inputSchema: {
        type: "object",
        properties: {
          production: { type: "string" },
          material: { type: "string" },
          contributors: { type: "string", enum: ["all", "cleared", "unknown"] },
          operation: { type: "string" },
          purpose: { type: "string" },
          tool: { type: "string" },
        },
        required: ["production", "material", "contributors", "operation", "purpose", "tool"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (!input || typeof input !== "object") throw new Error("A complete SCOPE selection is required.");
        for (const [key, allowed] of Object.entries(valid)) {
          if (!allowed.has(input[key])) throw new Error(`Unknown ${key} value.`);
        }
        const fields = { production: "source", material: "material", contributors: "contributors", operation: "operation", purpose: "purpose", tool: "tool" };
        Object.entries(fields).forEach(([key, id]) => { document.getElementById(id).value = input[key]; });
        document.querySelector('[data-view="check"]').click();
        const result = evaluate(input);
        renderResult(result);
        return { status: result.title, owner: result.owner, matchedRule: result.rule, environment: result.tool.name };
      },
    }, { signal: lifecycle.signal })).catch(() => {});
  } catch (_) {}
}

registerWebMcp();
