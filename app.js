// INIT MERMAID
mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  flowchart: {
    curve: "basis"
  }
});

// FILES
const flowFiles = [
  "flows/product-to-cms.yaml",
  "flows/customer-data.yaml"
];

const flowList = document.getElementById("flowList");
const details = document.getElementById("details");
const diagramContainer = document.getElementById("diagram");

// LOAD SIDEBAR
async function loadFlows() {
  for (let file of flowFiles) {
    try {
      const res = await fetch(file);
      const text = await res.text();
      const data = jsyaml.load(text);

      const card = document.createElement("div");
      card.className = "flow-card";
      card.innerText = data.flow.name;

      card.onclick = () => {
        renderFlow(data);

        document.querySelectorAll(".flow-card")
          .forEach(c => c.classList.remove("active"));

        card.classList.add("active");
      };

      flowList.appendChild(card);

    } catch (err) {
      console.error("Error loading flow:", err);
    }
  }
}

// RENDER FLOW
function renderFlow(data) {

  // ===== DETAILS =====
details.innerHTML = `
    <div class="card">
      <h2>${data.flow.name}</h2>
      <p>${data.flow.description || ""}</p>

      <div class="meta">
        <div><b>Source:</b> ${data.flow.source}</div>
        <div><b>Target:</b> ${data.flow.target}</div>
        <div><b>Via:</b> ${data.flow.via}</div>
        <div><b>Type:</b> ${data.flow.type}</div>
        <div><b>Business Owner:</b> ${data.flow.owner?.business || "-"}</div>
        <div><b>IT Owner:</b> ${data.flow.owner?.it || "-"}</div>
      </div>

      <div style="margin-top:10px;">
        ${(data.flow.data || []).map(d => `<span class="tag">${d}</span>`).join("")}
      </div>
    </div>
`;


  // ===== BUILD DIAGRAM =====
  const systems = data.flow.systems || [
    data.flow.source,
    data.flow.via,
    data.flow.target
  ];

  let edges = "";
  for (let i = 0; i < systems.length - 1; i++) {
    edges += `${systems[i]} --> ${systems[i + 1]}\n`;
  }

  const diagramDefinition = `
flowchart LR
${edges}

style ${data.flow.source} fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
style ${data.flow.via} fill:#ede9fe,stroke:#7c3aed,stroke-width:2px
style ${data.flow.target} fill:#dcfce7,stroke:#16a34a,stroke-width:2px
`;

  // CLEAN CONTAINER
  diagramContainer.innerHTML = "";

  // CREATE NEW MERMAID BLOCK
  const el = document.createElement("div");
  el.className = "mermaid";
  el.textContent = diagramDefinition;

  diagramContainer.appendChild(el);

  // RENDER
  setTimeout(() => {
    mermaid.init(undefined, el);
  }, 0);
}

// START
loadFlows();