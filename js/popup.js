var popup = Popup();

function popupTemplate(d) {
  var html = "";
  html += "<h3>" + d.panelData.normalName + "</h3>";
  html += "<div>Scientific Name: " + d.panelData.sciName + "</div>";
  html += "<div>Conservation Status: " + d.panelData.status + "</div>";
  html += "<div>Population Trend: " + d.panelData.trend + "</div>";

  return html;
}

function handlePopupOn(e, d) {
  popup.point(this).html(popupTemplate(d)).draw();
}

function handlePopupOff() {
  popup.hide();
}

function handleGeo() {
  d3.select(this).select("rect").style("opacity", 1);
}

function handleGeoOff() {
  d3.select(this).select("rect").style("opacity", 0.75);
}

//tooltip behavior
function hoverBehavior(indicator, g, d) {
  switch (indicator) {
    case null:
      g.style("pointer-events", "all")
        .on("mouseover", handlePopupOn)
        .on("mouseout", handlePopupOff);
      d3.select("#chart-wrapper").style("overflow-y", "hidden");
      // d3.select("#chart-wrapper")
      //   .style('overflow-x', 'hidden')
      break;

    case "geo":
      g.style("pointer-events", "all")
        .on("mouseover", handleGeo)
        .on("mouseout", handleGeoOff);
      break;

    case "conservation":
      g.style("pointer-events", d.id > 5555 ? "all" : "none");
      d3.select("#chart-wrapper").style("overflow-y", "hidden");
      break;

    case "threats":
      g.style("pointer-events", "none");
      d3.select("#chart-wrapper").style("overflow-y", "hidden");
      break;
  }
}

function beforced(g, d) {
  var width = d.canvasWidth;

  var simulation = d3
    .forceSimulation(layoutData)
    .force("charge", d3.forceManyBody().strength(100))
    .force("center", d3.forceCenter(width / 3, 300))
    .force("collide", d3.forceCollide().radius(function(d) {
        return 40
      }));

  simulation.on("tick", () => {
    g = d3.select("#chart").selectAll("g")

    g.attr("transform", function (d, i) {
        return `translate(${d.x}, ${d.y})`;
      });

    g.select('circle')
      .attr('r', 35)
    
    g.select('defs')
      .attr("width", 70)
      .attr("height", 70)
  });
}

function itemClickBehavior(indicator, g, d) {
  switch (indicator) {
    case null:
    g.style("pointer-events", "all").on("click", beforced);
    break;
    
    // case geo:
    // g.style("pointer-events", "none");
    // break;
  }
}
