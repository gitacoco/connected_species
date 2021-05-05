var statusCategory = [
    { id: 111, name: "RedList", status: "" },
    { id: 2222, name: "EN", status: "RedList" },
    { id: 3333, name: "VU", status: "RedList" },
    { id: 4444, name: "NT", status: "RedList" },
    { id: 5555, name: "LC", status: "RedList" },
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
    const pack = d3.pack().size([1051.4, 620]).padding(20);
    //onvert it back to array format
    const packData = pack(rootNode).descendants(); 
    //create  ordinal scale of color. The high the depth, the lower it is inside the tree
    action("setPackData", packData);
  //   console.log(packData);
  }
  
  function updateRoot() {
    var data = state.packData;
    var rootNodes = d3.select("#rootNodes");
  
    if (rootNodes.selectAll('*').empty()) {
      rootNodes
        .selectAll("g")
        .data(data)
        .join("g")
        .filter((d) => d.data.id > 111 && d.data.id < 5556)
        .each(nodeGroup);
    } else {
      nodeVisibility();
    }
  }
  
  function nodeGroup(d, i) {
    d3.select(this)
      .append("circle")
      .attr("transform", `translate(${d.x},${d.y})`)
      .style("opacity", 0)
      .attr("r", (d) => d.r)
      .attr('stroke-width', 0)
      .attr("fill", "#00768b69");
  }
  
  function nodeVisibility(){
    d3.select("#rootNodes")
      .selectAll("circle")
      .transition()
      .duration(() => state.selectedButton === 'conservation' ? 1500 : 200)
      .delay(() => state.selectedButton === 'conservation' ? 500 : 0)
      .style("opacity", state.selectedButton === 'conservation' ? 1 : 0)
  }