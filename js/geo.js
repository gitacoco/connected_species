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
    console.log(mapData)
    addMarkers();
  });
}

var markers = new L.FeatureGroup();

function addMarkers() {
  if (state.selectedItem == null) {
    // d3.select("#chart g").classed("selected", true); //temporary
    // itemClickAction("selectedItem", "SD");
    for (var i = 0; i < mapData.length; i++) {
      mapData[i]["recordings"].slice(0, 15).forEach((d, i) => {
        if (d.lat !== undefined && d.lng !== undefined) {
          var marker = L.circleMarker([+d.lat, +d.lng]);
        }

        marker.setStyle({
          radius: 7,
          weight: 0.25,
        });

        marker.bindPopup(createHtml(d, i));

        markers.addLayer(marker);

        map.addLayer(markers);
      });
    }
  } else {
    const selectedBird = mapData.find(
      (element) => element.birdCode === state.selectedItem
    );
    selectedBird["recordings"].forEach((d) => {
      if (d.lat !== undefined && d.lng !== undefined) {
        var marker = L.circleMarker([+d.lat, +d.lng]);
      } 

      marker.setStyle({
        radius: 7,
        weight: 0.25,
      });

      marker.bindPopup(createHtmlSelected(d));

      markers.addLayer(marker);
      map.addLayer(markers);
    });
  }
}

function clearMarkers() {
  markers.clearLayers();
}

// var popup = L.popup({
//   closeButton: false,
// });

function birdURLGenerator(d) {
  let urlGroup = []
  let endpoint = "https://apiv3.iucnredlist.org/api/v3/weblink/"
  if (d.background[0] !== ''){
    for (var i = 0; i < d.background.length; i++){
      eachName = d.background[i]
      let NameURL = encodeURIComponent(eachName.trim())
      eachQuery = endpoint + NameURL
      urlGroup.push(eachQuery)
      eachURL = urlGroup[0]
      console.log(eachURL)
      return eachURL;
    }
  }
}

function birdLinkConditional(d) {
  if (d.background[0] === ''){
    return 'No other birds'
  } else {
    return `<a href="${birdURLGenerator(d)}" target="_blank">${d.background}</a>`
  }
}

function createHtml(d, i) {
  var html = `
    <div id="waveform"></div>
    <audio controls autoplay loop style="margin-top: 10px"><source src="${d.file}">Your browser does not support the audio element.</audio>
    <h2>${mapData[i].birdName}</h2>
    <h3>Type: ${d.type}</h3>
    <h3>Time: ${d.date} ${d.time}</h3>
    <h3>Country: ${d.country}</h3>
    <h3>Recordist: ${d.recordist}</h3>
    <h3>Background: ${birdLinkConditional(d)}</h3>
    <h3 style="margin-bottom: 25px">Source: <a href="${d.url}" target="_blank">xeno-canto</a></h3>
    `;
  return html;
}

function createHtmlSelected(d) {
  var html = `
      <div id="waveform"></div>
      <audio controls autoplay loop style="margin-top: 10px"><source src="${d.file}">Your browser does not support the audio element.</audio>
      <h3>Type: ${d.type}</h3>
      <h3>Time: ${d.date} ${d.time}</h3>
      <h3>Country: ${d.country}</h3>
      <h3>Recordist: ${d.recordist}</h3>
      <h3>Background: ${birdLinkConditional(d)}</h3>
      <h3 style="margin-bottom: 25px">Source: <a href="${d.url}" target="_blank">xeno-canto</a></h3>
      `;
  return html;
}

map.on("popupopen", function (centerMarker) {
  const zoomLvl = 3;
  var cM = map.project(centerMarker.popup._latlng);
  cM.y -= centerMarker.popup._container.clientHeight / 3;
  map.setView(map.unproject(cM), zoomLvl, { animate: true });
});

// map.on("popupclose", function (centerMarker) {
//     const zoomLvl = 2;
//     var cM = map.project(centerMarker.popup._latlng);
//     cM.y -= centerMarker.popup._container.clientHeight / 2;
//     map.setView(map.unproject(cM), zoomLvl, { animate: true });
//   });

getMapData();
