var menuItems = [
    {
        id: 'geo',
        label: 'Geographical Ranges'
    },
    {
        id: 'color',
        label: 'Distinctive Color'
    },
    {
        id: 'taxonomy',
        label: 'Taxonomy of Naming'
    },
    {
        id: 'phylogeny',
        label: 'Evolutionary Phylogeny'
    },
    {
        id: 'threats',
        label: 'Threats and Actions'
    }
];

function handleMenuClick(e, d) {
    action('setSelectedIndicator', d.id);
}

var buttons = d3.select('#menu .items')

function handleMenuUnclick(e, d) {
    action('setSelectedIndicator', null);
    buttons.classed('selected', false)
}

//This is a good example of where D3 can be used to create standard HTML elements

function updateMenu() {
    buttons
        .selectAll('.item')
        .data(menuItems)
        .join('div')
        .classed('item', true)
        .classed('selected', d => state.selectedIndicator === d.id)
        .text(d => d.label)
        .on('click', handleMenuClick);
    
    buttons
        .select('.item')
        .classed('columnA', true)

    buttons
        .select('.item.selected')
        .on('click', handleMenuUnclick);

    d3.select('#titles')
        .on('click', handleMenuUnclick);
}