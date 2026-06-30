const flowFiles = [
  "flows/product-to-cms.yaml",
  "flows/customer-data.yaml"
];

const flowList = document.getElementById("flowList");
const details = document.getElementById("details");
const diagramDiv = document.getElementById("diagram");

async function loadFlows() {
  for (let file of flowFiles) {
    const res = await fetch(file);
    const text = await res.text();
    const data = jsyaml.load(text);

    const card = document.createElement("div");
    card.className = "flow-card";
    card.innerText = data.flow.name;

    card.onclick = () => renderFlow(data);

    flowList.appendChild(card);
  }
}

function renderFlow(data) {
  // DETAILS
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

  // DIAGRAM
  const systems = data.flow.systems || [
    data.flow.source,
    data.flow.via,
    data.flow.target
  ];

  const diagram = `graph LR\n${systems.join(" --> ")}`;

  diagramDiv.innerHTML = diagram;

  mermaid.init(undefined, diagramDiv);
}

loadFlows();