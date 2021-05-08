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

  d3.select("#footer").style("background-color", "#e9e9e956");

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
  attributionControl: false,
});

var tileLayer = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS",
    minZoom: 2,
    maxZoom: 9,
  }
);

function mapGenerator() {
  tileLayer.addTo(map);
  map.setView([52.5, -2], 2);
  map.setMaxBounds(bounds);
  map.zoomControl.setPosition("bottomright");
  //   map.zoomControl.setPosition('verticalcenterright');
}

function getMapData() {
  d3.json("data/sound_data.json").then(function (json) {
    mapData = json;
    addMarkers();
  });
}

function addMarkers() {
  var marker = L.circleMarker;

  if (state.selectedItem == null) {
    // d3.select("#chart g").classed("selected", true); //temporary
    // itemClickAction("selectedItem", "SD");
    for (var i = 0; i < mapData.length; i++) {
      mapData[i]["recordings"].slice(0, 15).forEach((d) => {
        if (d.lat !== undefined && d.lng !== undefined) {
          var markers = marker([+d.lat, +d.lng]);
        }

        markers.setStyle({
          radius: 6,
          weight: 0.25,
        });

        markers.addTo(map);
      });
    }
  } else {
    const selectedBird = mapData.find(
      (element) => element.birdCode === state.selectedItem
    );
    selectedBird["recordings"].forEach((d) => {
      if (d.lat !== undefined && d.lng !== undefined) {
        var markers = marker([+d.lat, +d.lng]);
      }

      markers.setStyle({
        radius: 6,
        weight: 0.25,
      });
      
      
      markers.addTo(map);
    });
  }
}

function clearMarkers() {
  map.eachLayer((layer) => {
    layer.remove();
  });
}

getMapData();
