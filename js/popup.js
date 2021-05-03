var popup = Popup();

function popupTemplate(d) {
    var html = '';
    html += '<h3>' + d.panelData.normalName + '</h3>';
    html += '<div>Scientific Name: ' + d.panelData.sciName + '</div>';
    html += '<div>Conservation Status: ' + d.panelData.status + '</div>';
    html += '<div>Population Trend: ' + d.panelData.trend + '</div>';

    return html;
}

function handlePopupOn(e, d) {
    popup
        .point(this)
        .html(popupTemplate(d))
        .draw();
}

function handlePopupOff() {
    popup.hide();
}

//tooltip behavior
function hoverBehavior(indicator, g, d) {
    switch (indicator) {
      case null:
        g.style("pointer-events", "all")
          .on("mouseover", handlePopupOn)
          .on("mouseout", handlePopupOff);
        // d3.select("#chart-wrapper")
        //   .style('overflow-x', 'hidden')
        break;
  
      case "conservation":
        g.style("pointer-events", d.id > 5555 ? "auto" : "none");
        break;
  
      case "threats":
        g.style("pointer-events", "none");
        d3.select("#chart-wrapper")
          .style('overflow-y', 'hidden')
        break;
    }
  }