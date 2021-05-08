var menuItems = [
  {
    id: "geo",
    label: "Voices in Habitats",
    icon: "assets/pics/icons/b1.png",
    iconActive: "assets/pics/icons/b1-1.png"
  },
  {
    id: "color",
    label: "Distinctive Color",
    icon: "assets/pics/icons/b2.png",
    iconActive: "assets/pics/icons/b2-1.png",
    mock: "assets/pics/color.png",
    mock_width: "1000px",
    mock_height: "500px",
    mock_left_margin: "20px",
    mock_top_margin: "150px"
  },
  {
    id: "taxonomy",
    label: "Taxonomy of Naming",
    icon: "assets/pics/icons/b3.png",
    iconActive: "assets/pics/icons/b3-1.png",
    mock: "assets/pics/tax.png",
    mock_width: "550px",
    mock_height: "550px",
    mock_left_margin: "250px",
    mock_top_margin: "70px"
  },
  {
    id: "conservation",
    // label: 'Evolutionary Phylogeny'
    label: "Conservation Status",
    icon: "assets/pics/icons/b4.png",
    iconActive: "assets/pics/icons/b4-1.png",
  },
  {
    id: "threats",
    label: "Threats and Actions",
    icon: "assets/pics/icons/b5.png",
    iconActive: "assets/pics/icons/b5-1.png"
  },
];

var buttons = d3.select("#menu");

function mockupAppend(d) {
    d3.select('#mock-container')
    .classed('columnAll', true)
    .style('width', `${d.mock_width}`)
    .style('height', `${d.mock_height}`)
    .style('margin-left', `${d.mock_left_margin}`)
    .style('margin-top', `${d.mock_top_margin}`)
    .style('background-size', 'contain')
    .style('background-repeat', 'no-repeat')
    .style('background-image', `url('${d.mock}')`)
}

function mockupRemove(d) {
    d3.select('#mock-container')
    .style('width', 0)
    .style('height', 0)
    .style('margin-left', 0)
    .style('margin-top', 0)
}

function handleMenuClick(e, d) {
var hasButtonSelected = state.selectedButton !== null;
var differButtonClicked = state.selectedButton !== d.id;

  if (hasButtonSelected) {
    if (differButtonClicked) {
        if (state.selectedButton === "taxonomy" || "color") {////temporary
            mockupRemove(d)
        }

        let OriginalThis = buttons.select(".selected").datum();
      buttons
        .select(".item.selected img")
        .attr("src", OriginalThis.icon)
        .classed("selected", false);
        
    } else {//但点击的就是被选中的按钮
      if (d.id === "taxonomy" || "color") {////temporary
        mockupRemove(d)
    }
      action("setSelectedButton", null);
      return;
    }} 

    //如果没有有按钮被选中的时候
    if (d.id === "taxonomy" || "color") {////temporary
        mockupAppend(d)
    } 
  
    action("setSelectedButton", d.id);
    d3.select(this)
    .select("img")
    .attr("src", d.iconActive);
}

function handleMenuEnter(e, d) {
    menuAction("setHoveredButton", d.id);
    if (state.selectedButton !== null) {
      //如果有任何一个按钮被选中的时候
      if (state.hoveredButton === state.selectedButton) {
        //并且hover的按钮和选中的按钮相同时
        return;
      } else if (state.hoveredButton !== state.selectedButton) {
        //并且hover的按钮和选中的按钮不同时
        d3.select(this).select("img").attr("src", d.iconActive);
      }
    } //没有任何按钮被选中的时候
    d3.select(this).select("img").attr("src", d.iconActive);
  }
  
  function handleMenuLeave(e, d) {
    if (state.selectedButton !== null) {
      //如果有任何一个按钮被选中的时候
      if (state.hoveredButton === state.selectedButton) {
        //并且hover的按钮和选中的按钮相同时
        return;
      }
    } //并且hover的按钮和选中的按钮不同时 或 没有任何按钮被选中的时候
    d3.select(this).select("img").attr("src", d.icon);
    menuAction("setHoveredButton", null);
  }
  

function getHtml(d) {
  // var iconHtml = "<div id=" + d.id + " class=icon" +"></div>"
  var iconHtml = '<img src="' + d.icon + '" width="32" height="32"></img>';
  var html = iconHtml + '<div class="label">' + d.label + "</div>";
  return html;
}

function initializeMenu() {
  buttons
    .selectAll(".item")
    .data(menuItems)
    .join("div")
    .classed("item", true)
    .html(getHtml)
    .on("click", handleMenuClick)
    .on("mouseenter", handleMenuEnter)
    .on("mouseleave", handleMenuLeave);

  buttons.select(".item").classed("columnA", true);

  // d3.select('#titles')
  //     .on('click', handleMenuClick);
}

//D3 can be used to create standard HTML elements
function updateMenu() {
  if (buttons.selectAll("*").empty()) initializeMenu();

  buttons
    .selectAll(".item")
    .classed("selected", (d) => state.selectedButton === d.id)
    .classed("hovered", (d) => state.hoveredButton === d.id);
}
