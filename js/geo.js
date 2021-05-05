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

  d3.select('#map-wrapper')
    .style('z-index', 0)

  d3.select("#map")
    .style('z-index', 0)
    .style("width", "1220px")
    .style("height", "900px")
    .style("position", "fixed")
    .transition()
    .duration(1000)
    // .delay(2000)
    .style("opcatity", "1");

  d3.select("#control")
    .style("padding-bottom", "70px")
    .style(
        "background",
        "linear-gradient(to bottom, #e9e9e9cb 75%, #e9e9e900)"
      );

  d3.select("#footer").style("background-color", "#e9e9e956");

  d3.select('#chart-wrapper')
    .style('height', '651px')
    .style('overflow-y', 'scroll');

  mapGenerator();
}

function removeLabel(d, i) {
  d3.select("#chart").selectAll("text").transition().duration(300).remove();

  d3.select("#map").style("width", 0).style("height", 0).style("opcatity", 0);

  d3.select("#control")
    .style("padding-bottom", "55px")
    .style(
        "background",
        "linear-gradient(to bottom, #e9e9e9 88%, rgba(233, 233, 233, 0))"
      );

  d3.select("#footer").style("background-color", "#e9e9e9");

  d3.select('#chart-wrapper')
  .style('height', 'auto')
  .style('overflow-y', 'scroll');
}

var map = L.map("map");

//water color
// var tileLayer = L.tileLayer(
//   "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}",
//   {
//     attribution:
//       'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     subdomains: "abcd",
//     minZoom: 1,
//     maxZoom: 16,
//     ext: "jpg",
//   }
// );

//Esri.WorldTerrain
var tileLayer = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS",
    minZoom: 1.5,
    maxZoom: 10,
  }
);

function mapGenerator() {
  tileLayer.addTo(map);

  //The first argument is an array [latitude, longitude] and the second argument a zoom level.
//   map.setView([8.7832, 184.5085], 1.5);
  map.setView([52.5, -2], 6);
//   map.scrollWheelZoom.disable();
  map.zoomControl.setPosition('bottomright');
}
// 碰壁后禁止拖拽
// var bounds = L.latLngBounds([[51.55, -0.2], [51.45, 0]]);
// map.setMaxBounds(bounds);
// map.on('drag', function() {
//     map.panInsideBounds(bounds, { animate: false });
// });

//mock data!! only for testing

var mapData;

function addMarkers() {
    mapData.forEach(function(d) {
      var marker = L.circleMarker([+d.latitude, +d.longitude]);
      marker.addTo(map);
    })
  }

d3.csv('data/map_mock_data.csv')
    .then(function(csv) {
    mapData = csv 
    addMarkers();
});
