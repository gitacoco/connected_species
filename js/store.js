var state = {
    data: null,
    selectedIndicator: null
};

function action(type, param) {
    switch(type) {
    case 'setData':
        state.data = param;
        break;
        
    case 'setSelectedIndicator':
        state.selectedIndicator = param;
        break;
    }

    update();
}