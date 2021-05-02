var config = {
    width: 1060,
    numColumns: 7,
    galleryRadius: 50,
    transitionDuration: 600,
    transitionDelay: 8,
    indentation: 30,
    threatCircleY: 300,
    threatCoeffiX: 50
};

function layout(data) {
    var cellWidth = config.width / config.numColumns;
    var cellHeight = cellWidth;
    var datasetSum = data.length;

    var layoutData = data.map(function(d, i) {
        var item = {};

        item.id = d.code;

        if(state.selectedButton === null) {
            var column = i % config.numColumns;
            var row = Math.floor(i / config.numColumns);
            item.x = column * cellWidth + 0.5 * cellWidth;
            item.y = row * cellHeight + 0.5 * cellHeight;
            item.galleryRadius = config.galleryRadius;
            item.defsRadius = 2 * config.galleryRadius;
            item.strokewidth = 4.5;
            item.canvasWidth = 1051.4;
            item.canvasHeight = 1100
        } else if(state.selectedButton === 'threats'){
            item.x = config.indentation + i * config.threatCoeffiX;
            item.y = config.threatCircleY;
            item.galleryRadius = 0.4 * config.galleryRadius;
            item.defsRadius = 2 * item.galleryRadius;
            item.strokewidth = 2.5;
            item.canvasWidth = config.threatCoeffiX * datasetSum + 3 * config.indentation;
            item.canvasHeight = 500
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