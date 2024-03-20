const BigQuery = require("@google-cloud/bigquery").BigQuery;
const instancia = new BigQuery();

async function criadDataset() {
  const [datasets] = await instancia.getDatasets();
  const nomeDataset = "forumAlura";
  const datasetFiltrados = datasets.filter(function (datasetAtual) {
    return datasetAtual.id === nomeDataset;
  });

  if (datasetFiltrados.length > 0) {
    console.log("dataset já existe");
    return;
  }

  await instancia.createDataset(nomeDataset)
  console.log("dataset criado com sucesso")
}
criadDataset();