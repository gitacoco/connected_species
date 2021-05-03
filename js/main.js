d3.json("data/IUCNData.json").then(dataIsReady);

var statusCategory = [
  { id: 111, name: "RedList", status: "" },
  { id: 2222, name: "EN", status: "RedList" },
  { id: 3333, name: "VU", status: "RedList" },
  { id: 4444, name: "NT", status: "RedList" },
  { id: 5555, name: "LC", status: "RedList" },
];

var treeCategory = [
    { id: "111", name: "RedList", status: "" },
    { id: "2222", name: "EN", status: "RedList" },
    { id: "3333", name: "VU", status: "RedList" },
    { id: "4444", name: "NT", status: "RedList" },
    { id: "5555", name: "LC", status: "RedList" },
  ];

function packDataGenerator() {
  for (var i = 0; i < adaptedData.length; i++) {
    statusCategory.push(adaptedData[i]);
  }

  const stratify = d3
    .stratify()
    .id((d) => d.name)
    .parentId((d) => d.status);

  const rootNode = stratify(statusCategory).sum((d) => d.value);
  const pack = d3.pack().size([1051.4, 650]).padding(20);
  //onvert it back to array format
  const packData = pack(rootNode).descendants(); 
  //create  ordinal scale of color. The high the depth, the lower it is inside the tree
  action("setPackData", packData);
//   console.log(packData);
}

function dataIsReady(fileData) {
  adaptedData = fileData.map(transformObject);
  //   action("setData", adaptedData);

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
