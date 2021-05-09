const recog = d3.select("#recognition");

function runAR() {
  // recog.classed("active", true)
  d3.select("body")
  .style("background-color", "#e9e9e93b")
  .style("overflow", "hidden");

  d3.select("#control").style(
    "background",
    "linear-gradient(rgb(233 233 233 / 63%) 88%, rgba(233, 233, 233, 0))"
  );
  d3.select("#recognition").classed("active", true);
  document.getElementById("recogIMG").src = "assets/pics/rec_close.png";
  window.parent.document
    .getElementsByClassName("panolens-canvas")[0]
    .classList.add("active");
  window.parent.render();
  window.parent.startPanoPic();
}

function closeAR() {
  d3.select("body")
  .style("background-color", "#e9e9e9")
  .style("overflow", "auto");
  d3.select("#control").style(
    "background",
    "linear-gradient(rgb(233, 233, 233) 88%, rgba(233, 233, 233, 0))"
  );
  // recog.classed("active", false)
  document.getElementById("recogIMG").src = "assets/pics/rec.png";
  window.parent.document
    .getElementsByClassName("panolens-canvas")[0]
    .classList.remove("active");
  // window.parent.render();
  // window.parent.startPanoPic();
}

function handleRecogOn() {
  action("setSelectedButton", "recog");
  runAR();
}

function handleRecogOff() {
  action("setSelectedButton", null);
  closeAR();
}

function recogBehavior(indicator, e, d) {
  switch (indicator) {
    case null:
      recog.classed("active", true).on("click", handleRecogOn);
      d3.select("body").style("background-color", "#e9e9e9");
      break;

    case "recog":
      recog.on("click", handleRecogOff);
      break;

    case "geo":
    case "color":
    case "taxonomy":
    case "status":
    case "threats":
      recog.classed("active", false);
      d3.select("body").style("background-color", "#e9e9e9");
      break;
  }
}
