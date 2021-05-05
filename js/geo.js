function getTruncatedLabel(text) {
  return text.length < 17 ? text : text.slice(0, 16) + "...";
}

function appendLabel(g, d, i) {
  let labelText = getTruncatedLabel(d.panelData.normalName);

  //append name label to the items 
  g.append("text")
    .transition()
    .duration(config.transitionDuration)
    .delay(i * config.transitionDelay + 400)
    .attr("x", d.x)
    .attr("dy", "0.3em")
    .text(labelText);

  d3.select("#map")
    .style("width", "1220px")
    .style("height", "900px")
    .style("position", "fixed")
    .transition()
    .duration(1000)
    .style("opcatity", "1");

  d3.select("#control")
    .style("padding-bottom", "60px")
    .style(
      "background",
      "linear-gradient(to bottom, #e9e9e9cb 80%, #e9e9e900)"
    );

  d3.select("#footer")
  .style("background-color", "#e9e9e956");

  d3.select("#chart-wrapper")
    .style("height", "651px")
    .style("overflow-y", "scroll");

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

  d3.select("#chart-wrapper")
    .style("height", "auto")
    .style("overflow-y", "scroll");
}

var mapData;

const rightBottomCorner = L.latLng(-79, -180),
      leftTopCorner = L.latLng(90, 180);
var bounds = new L.LatLngBounds(rightBottomCorner, leftTopCorner);

var map = L.map("map", {
    maxBoundsViscosity: 0,
    attributionControl: false
  });

var tileLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",{
    attribution:
      "Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS",
    minZoom: 2,
    maxZoom: 9
  }
);

var colorScale = {
    'Charge Your Car': '#B6A6CA',
    'Source London': '#6D98BA',
    'POD Point': '#FC814A',
    'Chargemaster (POLAR)': '#D282A6',
    'Ecotricity (Electric Highway)': '#64B6AC',
    'ChargePoint Services': '#EEC170',
    'ChargePlace Scotland': '#6D98BA',
    'APT': '#AF4319'
};

function mapGenerator() {
  tileLayer.addTo(map);
  map.setView([52.5, -2], 2);
  map.setMaxBounds(bounds);
  map.zoomControl.setPosition("bottomright");
//   map.zoomControl.setPosition('verticalcenterright');
}

function getMapData() {
  d3.csv("data/map_mock_data.csv").then(function (csv) {
    mapData = csv;
    addMarkers();
  });
}

function addMarkers() {
    mapData.forEach((d) => {
        var marker = L.circleMarker([+d.latitude, +d.longitude]);
        var inService = d.chargeDeviceStatus === 'In service';
        var color = colorScale[d.deviceControllerName] || '#aaa';
        var inService = d.chargeDeviceStatus === 'In service';
        
        if (inService) {
            marker.setStyle({
                radius: 8,
                fillColor: color,
                fillOpacity: 1,
                color: '#ddd',//the colour of the circle’s outline
                weight: 0.25//sets the thickness of the circle’s outline
            });
        } else {
            marker.setStyle({
                radius: 8,
                fillColor: '#eee',
                fillOpacity: 0.5,
                color: '#777',
                weight: 1
            });
        }

        marker.addTo(map);
    });
  }

getMapData();

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
