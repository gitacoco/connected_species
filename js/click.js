function beforced(g, d) {
  itemClickAction("selectedItem", d.code);

  var width = d.canvasWidth;

  var simulation = d3
    .forceSimulation(layoutData)
    .force("charge", d3.forceManyBody().strength(100))
    .force("center", d3.forceCenter(width / 3, 300))
    .force(
      "collide",
      d3.forceCollide().radius(d => 30)
    );

  simulation.on("tick", () => {
    g = d3.select("#chart").selectAll("g");
    g.attr("transform", (d, i) => `translate(${d.x}, ${d.y})`);

    g.select("circle")
      .attr("r", 25 )
      .attr("stroke-width", d.id > 5555 ? d.strokewidth * 0.5 : 0);

    g.select("defs")
    .select("image")
    .attr("width", 50 )
    .attr("height", 50 )

    d3.select("#canvas")
      .attr("width", d.canvasWidth)
      .attr("height", d.canvasHeight / 2);
  });
}

function changeMap(g, d) {
let chart = d3.select('#chart')
let hasItemSelected = state.selectedItem !== null;
let differItemClicked = state.selectedItem !== d.code;

if (hasItemSelected) {
    if (differItemClicked) {
        // let OriginalThis = chart.select(".selected").datum()
        chart
        .select("g.selected")
        .classed("selected", false)

    } else {
        itemClickAction("selectedItem", null);
        return;
    }
}

itemClickAction("selectedItem", d.code);
}

function updateItem() {
    let chart = d3.select('#chart')
    chart.selectAll('g')
    .classed("selected", d => state.selectedItem === d.code)
    .classed("hovered", d => state.hoveredItem === d.code)
}

function itemClickBehavior(indicator, g, d) {
  switch (indicator) {
    case null:
    //   g.style("pointer-events", "all").on("click", beforced);
      break;

    case "geo":
      g.style("pointer-events", "all").on("click", changeMap);
      break;
  }
}