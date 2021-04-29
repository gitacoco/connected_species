var config = {
    width: 1060,
    numColumns: 7,
    galleryRadius: 50,
    transitionDuration: 500,
    transitionDelay: 8
};

function layout(data) {
    var cellWidth = config.width / config.numColumns;
    var cellHeight = cellWidth;

    var layoutData = data.map(function(d, i) {
        var item = {};

        item.id = d.code;

        if(state.selectedIndicator === null) {
            var column = i % config.numColumns;
            var row = Math.floor(i / config.numColumns);
            item.x = column * cellWidth + 0.5 * cellWidth;
            item.y = row * cellHeight + 0.5 * cellHeight;
            item.galleryRadius = config.galleryRadius;
            item.defsRadius = 2 * config.galleryRadius;
            item.strokewidth = 4.5
        } else if(state.selectedIndicator === 'threats'){
            item.x = 60 + i * 60;
            item.y = 300;
            item.galleryRadius = 0.5 * config.galleryRadius;
            item.defsRadius = config.galleryRadius;
            item.strokewidth = 2.5
        }

        item.code = d.code;

        item.panelData = {
        sciName: d.name,
        normalName: d.normalName,
        status: d.status,
        trend: d.trend
        }

        return item;
    });

    return layoutData;
}