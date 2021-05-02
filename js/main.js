d3.csv("data/birds.csv", transformRow).then(dataIsReady);

function dataIsReady(csv) {
  action("setData", csv);
}

function parseNumber(d) {
  return d === "" ? null : +d;
}

function parseString(d) {
  return d === "" ? "Unknown" : d;
}

function transformRow(d) {
  return {
    name: d.birdName,
    code: d.birdCode,
    normalName: d.normalName,
    status: d.conservationStatus,
    trend: parseString(d.populationTrend),
  };
}
