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
      break;

    case "geo":
      g.style("pointer-events", "all")
        .on("mouseover", handleGeo)
        .on("mouseout", handleGeoOff);
      break;

    case "status":
      g.style("pointer-events", d.id > 5555 ? "all" : "none")
        .on("mouseover", handlePopupOn)
        .on("mouseout", handlePopupOff);
      d3.select("#chart-wrapper").style("overflow-y", "hidden");
      break;

    case "threats":
      g.style("pointer-events", "none");
      d3.select("#chart-wrapper").style("overflow-y", "hidden");
      break;

    case "recog":
      g.style("pointer-events", "all")
      .on("mouseover", handlePopupOff);
      d3.select("#chart-wrapper").style("overflow-y", "hidden");
      break;
  }
}

// function updateItem() {
//   let g = d3.select("#chart").selectAll("g");

//   g.on("click", handleItemClick);
//   g.classed("selected", (d) => state.selectedItem === d.id);
// }
