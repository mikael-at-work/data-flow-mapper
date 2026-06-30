const flows = [
  "flows/product-to-cms.yaml",
  "flows/customer-data.yaml"
];

const selector = document.getElementById("flowSelector");

flows.forEach(f => {
  let opt = document.createElement("option");
  opt.value = f;
  opt.text = f.split("/")[1];
  selector.appendChild(opt);
});

selector.addEventListener("change", loadFlow);

async function loadFlow() {
  const res = await fetch(selector.value);
  const text = await res.text();

  const data = jsyaml.load(text);

  document.getElementById("flowDetails").innerHTML = `
    <h2>${data.flow.name}</h2>
    <p><b>Source:</b> ${data.flow.source}</p>
    <p><b>Target:</b> ${data.flow.target}</p>
    <p><b>Type:</b> ${data.flow.type}</p>
  `;

  const diagram = `
    graph LR
    ${data.flow.source} --> ${data.flow.via}
    ${data.flow.via} --> ${data.flow.target}
  `;

  const diagramDiv = document.getElementById("diagram");
  diagramDiv.innerHTML = diagram;

  mermaid.init(undefined, diagramDiv);
}

loadFlow();