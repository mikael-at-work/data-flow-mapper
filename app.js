// Initialize Mermaid ONCE
mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  flowchart: {
    curve: "basis"
  }
});

// Your flow files
const flowFiles = [
  "flows/product-to-cms.yaml",
  "flows/customer-data.yaml"
];

const flowList = document.getElementById("flowList");
const details = document.getElementById("details");
const diagramContainer = document.getElementById("diagram");

// Load flows into sidebar
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
        setActive(card);
        renderFlow(data);
      };

      flowList.appendChild(card);

    } catch (err) {
      console.error("Failed to load flow:", file, err);
    }
  }
}

// Highlight active flow in sidebar
function setActive(selectedCard) {
  document.querySelectorAll(".flow-card").forEach(c => {
    c.classList.remove("active");
  });

  selectedCard.classList.add("active");
}

// Render selected flow
function renderFlow(data) {

  // ===== DETAILS CARD =====
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
