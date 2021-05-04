//populating the g elements when they’re first created
function initializeGroup(g, d, canvas) {
  g.classed("species", true)
    .style("opacity", 0)
    .attr("transform", `translate(${d.x},${d.y})`);

  canvas.attr("width", d.canvasWidth);

  g.append("circle");
  g.append("svg:defs").append("pattern").append("image");
}

function updateGroup(d, i) {
  var g = d3.select(this);
  var canvas = d3.select("#canvas");

  if (g.selectAll("*").empty()) initializeGroup(g, d, canvas);

  if (state.selectedButton === 'geo') appendLabel(g, d, i);
  if (state.selectedButton !== 'geo') removeLabel(g, d, i);

  hoverBehavior(state.selectedButton, g, d);

  g.transition() //location and opacity
    .duration(config.transitionDuration)
    .delay(i * config.transitionDelay)
    .style("opacity", 1)
    .attr("transform", `translate(${d.x},${d.y})`)
    .style("opacity", d.visible ? 1 : 0);

  // add image in each circle
  g.select("defs")
    .select("pattern")
    .attr("id", (d) => d.code)
    .attr("width", 1)
    .attr("height", 1)
    .attr("patternUnits", "objectBoundingBox")
    .attr("x", 0)
    .attr("y", 0)
    .select("image")
    //id小于等于4的都是层次结构的父级节点，所以不用填充
    .attr("xlink:href", d.id > 5555 ? (d) => `assets/img/${d.code}.jpg` : null)
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
    .attr("stroke-width", d.id > 5555 ? d.strokewidth : 0)
    .style("fill", d.id > 5555 ? `url(#${d.code})` : "#00768b69");

  canvas
    .transition()
    .delay(100)
    .duration(800)
    .attr("width", d.canvasWidth)
    .attr("height", d.canvasHeight);
}

function updateChart() {
  var layoutData = layout(state.packData);

  d3.select("#chart")
    .selectAll("g")
    .data(layoutData, (d) => d.id) //key function
    .join("g")
    .each(updateGroup)
    // .each(updateRoot);
}

function update() {
  updateChart();
  updateMenu();
  updateRoot();
}
