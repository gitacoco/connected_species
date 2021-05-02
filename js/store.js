var state = {
    data: null,
    selectedButton: null,
    sortedOption: null,
    hoveredButton: null
};

function action(type, param) {
    switch(type) {
    case 'setData':
        state.data = param;
        break;

    case 'setSelectedButton':
        state.selectedButton = param;
        break;

    case 'setHoveredButton':
        state.hoveredButton = param;
        break;
    }

    // console.log(state)

    update();
}