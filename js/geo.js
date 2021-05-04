function getTruncatedLabel(text) {
    return text.length < 17 ? text : text.slice(0, 16) + '...';
}

function appendLabel(g, d, i) {
    let labelText = getTruncatedLabel(d.panelData.normalName)
    
    g.append('text')
    .transition()
    .duration(config.transitionDuration)
    .delay(i * config.transitionDelay + 400)
    .attr('x', d.x)
    .attr('dy', '0.3em')
    .text(labelText)
}

function removeLabel(d, i) {
    d3.select('#chart')
    .selectAll('text')
    .transition()
    .duration(300)
    .remove()
}