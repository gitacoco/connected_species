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
      .duration(1000)
      .delay(state.nodeTransitionDelay)
      .style("opacity", state.selectedButton === 'conservation' ? 1 : 0)
  }