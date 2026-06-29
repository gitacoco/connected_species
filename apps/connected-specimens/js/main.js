d3.json("data/IUCNData.json").then(dataIsReady);

function dataIsReady(fileData) {
  adaptedData = fileData.map(transformObject);
  //   action("setData", adaptedData);
//   adaptedDatad = preprocesstree(adaptedData);
  packDataGenerator();
}

function parseNumber(d) {
  return d === "" ? null : +d;
}

function parseString(d) {
  return d === "" ? "Unknown" : d;
}

function transformObject(d) {
  return {
    id: d.id,
    name: d.sciName,
    code: d.imgCode,
    normalName: d.commonName,
    status: d.conservationStatus,
    value: 1,
    trend: parseString(d.populationTrend),
    taxonomy: {
      Class: d.taxonomy.Class,
      order: d.taxonomy.order,
      family: d.taxonomy.family,
      genus: d.taxonomy.genus,
    },
  };
}
