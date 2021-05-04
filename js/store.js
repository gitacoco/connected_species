var state = {
  data: null,
  packData: null,
  treeData: null,
  selectedButton: null,
  sortedOption: null,
  hoveredButton: null,
  nodeTransitionDelay: null,
  nodeTransitionDuration: null,
};

function action(type, param) {
  switch (type) {
    case "setData":
      state.data = param;
      break;

    case "setPackData":
      state.packData = param;
      break;

    case "setSelectedButton":
      state.selectedButton = param;
      break;

    case "nodeTransitionDelay":
      state.nodeTransitionDelay = param;
      break;

    case "nodeTransitionDuration":
      state.nodeTransitionDuration = param;
      break;
  }

  update();
}

function menuAction(type, param) {
  switch (type) {
    case "setHoveredButton":
      state.hoveredButton = param;
      break;
  }
}
