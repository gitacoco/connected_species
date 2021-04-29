var popup = Popup();

function popupTemplate(d) {
    var html = '';
    html += '<h3>' + d.panelData.normalName + '</h3>';
    html += '<div>Scientific Name: ' + d.panelData.sciName + '</div>';
    html += '<div>Conservation Status: ' + d.panelData.status + '</div>';
    html += '<div>Population Trend: ' + d.panelData.trend + '</div>';

    return html;
}

function handleMouseover(e, d) {
    popup
        .point(this)
        .html(popupTemplate(d))
        .draw();
}

function handleMouseout() {
    popup.hide();
}