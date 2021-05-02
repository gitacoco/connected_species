//populating the g elements when they’re first created
function initializeGroup(g, d, canvas) {
  g.classed("species", true)
    .style('opacity', 0)
    .attr("transform",`translate(${d.x},${d.y})`)
    
  canvas
    .attr("width", d.canvasWidth);

  g.append("circle");
  g.append("svg:defs")
    .append("pattern")
    .append("image");
}

function hoverBehavior(indicator, g) {
  switch(indicator) {
  case null:
    g.style('pointer-events', 'auto')
      .on('mouseover', handlePopupOn)
      .on('mouseout', handlePopupOff);
    // d3.select("#chart-wrapper")
    //   .style('overflow-x', 'hidden')
    break;

  case 'threats':
    g.style('pointer-events', 'none')
    // d3.select("#chart-wrapper")
    //   .style('overflow-x', 'scroll')
    break;
}
}

//updating the g element and its members.
function updateGroup(d, i) {
  var g = d3.select(this);
  var canvas = d3.select("#canvas");
  
  if (g.selectAll("*").empty()) initializeGroup(g, d, canvas);

  hoverBehavior(state.selectedButton, g);

  g.transition()
    .duration(config.transitionDuration)
    .delay(i * config.transitionDelay)
    .style('opacity', 1)
    .attr("transform",`translate(${d.x},${d.y})`);

  // add image in each circle
  g.select("defs")
    .select("pattern")
      .attr("id", d => d.code)
      .attr("width", 1)
      .attr("height", 1)
      .attr("patternUnits", "objectBoundingBox")
      .attr("x", 0)
      .attr("y", 0)
    .select("image")
      .attr("xlink:href", d => `assets/img/${d.code}.jpg`)
      .transition()
      .duration(config.transitionDuration)
      .delay(i * config.transitionDelay)
      .attr("width", d.defsRadius)
      .attr("height", d.defsRadius)
      .attr("preserveAspectRatio", "xMidYMid slice");
  
  g.select("circle") //draw circles
    .transition()
    .duration(config.transitionDuration)
    .delay(i * config.transitionDelay)
    .attr("r", d.galleryRadius)
    .attr("stroke-width", d.strokewidth)
    .style("fill", d => `url(#${d.code})`);
  
  canvas
    .transition()
    .delay(100)
    .duration(800)
    .attr("width", d.canvasWidth)
    .attr("height", d.canvasHeight)
}

function updateChart() {
  var layoutData = layout(state.data);

  d3.select("#chart")
    .selectAll("g")
    .data(layoutData, d => d.id)//key function
    .join("g")
    .each(updateGroup);
}

function update() {
  updateChart();
  updateMenu();
}