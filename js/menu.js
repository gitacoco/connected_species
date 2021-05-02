var menuItems = [
    {
        id: 'geo',
        label: 'Voices in Habitats',
        icon:'assets/pics/icons/b1.png',
        iconActive:'assets/pics/icons/b1-1.png'
    },
    {
        id: 'color',
        label: 'Distinctive Color',
        icon:'assets/pics/icons/b2.png',
        iconActive:'assets/pics/icons/b2-1.png'
    },
    {
        id: 'taxonomy',
        label: 'Taxonomy of Naming',
        icon:'assets/pics/icons/b3.png',
        iconActive:'assets/pics/icons/b3-1.png'
    },
    {
        id: 'conservation',
        // label: 'Evolutionary Phylogeny'
        label: 'Conservation Status',
        icon:'assets/pics/icons/b4.png',
        iconActive:'assets/pics/icons/b4-1.png'
    },
    {
        id: 'threats',
        label: 'Threats and Actions',
        icon:'assets/pics/icons/b5.png',
        iconActive:'assets/pics/icons/b5-1.png'
    }
];

var buttons = d3.select('#menu')

function handleMenuEnter(e, d) {
    action('setHoveredButton', d.id);

    if (state.selectedButton !== null) { //如果有任何一个按钮被选中的时候
        if (state.hoveredButton === state.selectedButton) { //并且hover的按钮和选中的按钮相同时
            return
        } else if (state.hoveredButton !== state.selectedButton){//并且hover的按钮和选中的按钮不同时
            d3.select(this)
            .select('img')
            .attr('src', d.iconActive);
        }
    }//没有任何按钮被选中的时候
    d3.select(this)
    .select('img')
    .attr('src', d.iconActive);
}

function handleMenuLeave(e, d) {
    if (state.selectedButton !== null) {//如果有任何一个按钮被选中的时候
        if (state.hoveredButton === state.selectedButton) {//并且hover的按钮和选中的按钮相同时
            return
        } 
    } //并且hover的按钮和选中的按钮不同时 或 没有任何按钮被选中的时候
    d3.select(this)
    .select('img')
    .attr('src', d.icon)
    action('setHoveredButton', null);
}

function handleMenuClick(e, d) {
    if (state.selectedButton !== null) {//如果有按钮被选中的时候
        if (state.selectedButton !== d.id) {//且点击的按钮和被选中的按钮不同的时候
            let OriginalThis = buttons.select('.selected').datum()
            buttons.select(".item.selected img")
            .attr('src', OriginalThis.icon)
            .classed('selected', false)
        } else {//但点击的按钮和被选中的按钮相同的时候,或者
            action('setSelectedButton', null);
            return
        }}//如果没有有按钮被选中的时候
        action('setSelectedButton', d.id);
        d3.select(this)
          .select('img')
          .attr('src', d.iconActive)
}

function getHtml(d) {
    // var iconHtml = "<div id=" + d.id + " class=icon" +"></div>"
    var iconHtml = '<img src="' + d.icon + '" width="32" height="32"></img>'
    var html = iconHtml + '<div class="label">'+ d.label +'</div>'
    return html;
}

function initializeMenu() {
    buttons
        .selectAll('.item')
        .data(menuItems)
        .join('div')
        .classed('item', true)
        .html(getHtml)
        .on('click', handleMenuClick)
        .on('mouseenter', handleMenuEnter)
        .on('mouseleave', handleMenuLeave);
    
    buttons
        .select('.item')
        .classed('columnA', true)

    d3.select('#titles')
        .on('click', handleMenuClick);
}

//D3 can be used to create standard HTML elements
function updateMenu() {

    if (buttons.selectAll("*").empty()) initializeMenu();

    buttons
        .selectAll('.item')
        .classed('selected', d => state.selectedButton === d.id)
        .classed('hovered', d => state.hoveredButton === d.id)
}