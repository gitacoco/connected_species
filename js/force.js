var forceWidth = 300, forceHeight = 800
var layoutData = layout(state.packData);
var simulation = d3.forceSimulation(layoutData)
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(forceWidth / 2, forceHeight / 2))
    .on('tick', ticked);

function ticked() {
    d3.select("#chart")
    .selectAll('g')
    .attr('x', ()=> d.x)
    .attr('y', ()=> d.y)
    }

// forceCenter (for setting the center of gravity of the system)
// forceManyBody (for making elements attract or repel one another)
// forceCollide (for preventing elements overlapping)
// forceX and forceY (for attracting elements to a given point)
// forceLink (for creating a fixed distance between connected elements)