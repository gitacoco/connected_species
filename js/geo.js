function getTruncatedLabel(text) {
  return text.length < 17 ? text : text.slice(0, 16) + "...";
}

function appendLabel(g, d, i) {
  let labelText = getTruncatedLabel(d.panelData.normalName);

  g.append("text")
    .transition()
    .duration(config.transitionDuration)
    .delay(i * config.transitionDelay + 400)
    .attr("x", d.x)
    .attr("dy", "0.3em")
    .text(labelText);

  d3.select("#map")
    .style("width", "838px")
    .style("height", "600px")
    .style("position", "fixed")
    .transition()
    .duration(1000)
    .delay(500)
    .style("opcatity", "1");

  mapGenerator();
}

function removeLabel(d, i) {
  d3.select("#chart").selectAll("text").transition().duration(300).remove();

  d3.select("#map")
    .style("width", "0")
    .style("height", "0")
    .style("opcatity", "0");
}

var map = L.map("map");

var tileLayer = L.tileLayer(
  "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}",
  {
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: "abcd",
    minZoom: 1,
    maxZoom: 16,
    ext: "jpg",
  }
);

function mapGenerator() {
  tileLayer.addTo(map);

  //The first argument is an array [latitude, longitude] and the second argument a zoom level.
  map.setView([8.7832, 184.5085], 1.5);
}
