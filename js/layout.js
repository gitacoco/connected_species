var config = {
    width: 1060,
    numColumns: 7,
    galleryRadius: 50,
    transitionDuration: 600,
    transitionDelay: 8,
    indentation: 30,
    geoCoeffiY: 60,
    threatCircleY: 300,
    threatCoeffiX: 50
};

// function sortAccessor(d) {//打标签
//     var index = d.data.id
//     // if(index.length < 5) index = 0;
//     return index;
// }

function getSortedData(data) {//排序和过滤
    var sorted;
    sorted = _.orderBy(data, d => d.data['normalName'])
                _.remove(sorted, ["id", "RedList"])
                _.remove(sorted, ["id", "EN"])
                _.remove(sorted, ["id", "VU"])
                _.remove(sorted, ["id", "NT"])
                _.remove(sorted, ["id", "LC"]);

    return sorted;
}

function visible(d){
    return _.isEmpty(d.children)
}

function layout(data) {
    var cellWidth = config.width / config.numColumns;
    var cellHeight = cellWidth;
    var datasetSum = data.length;

    var sortedData = getSortedData(data);

    var layoutData = sortedData.map(function(d, i) {
        var item = {};
        const dPre = d["data"]

        item.id = dPre.id;

        if(state.selectedButton === null) {
            var column = i % config.numColumns;
            var row = Math.floor(i / config.numColumns);
            item.x = column * cellWidth + 0.5 * cellWidth;
            item.y = row * cellHeight + 0.5 * cellHeight;
            item.galleryRadius = config.galleryRadius; 
            item.defsRadius = 2 * config.galleryRadius;
            item.strokewidth = 4.5;
            item.canvasWidth = 1051.4;
            item.canvasHeight = 1100;
            item.visible = visible(d);
        } else if(state.selectedButton === 'geo'){
            item.x = 35
            item.y = config.indentation + i * config.geoCoeffiY
            item.galleryRadius = 0.35 * config.galleryRadius
            item.defsRadius = 2 * item.galleryRadius
            item.strokewidth = 2.5;
            item.canvasWidth = 1051.4;//需要改窄，transition 也要改
            item.canvasHeight = 2700;
            item.visible = visible(d);
        } else if(state.selectedButton === 'threats'){
            item.x = config.indentation + i * config.threatCoeffiX;
            item.y = config.threatCircleY;
            item.galleryRadius = 0.4 * config.galleryRadius;
            item.defsRadius = 2 * item.galleryRadius;
            item.strokewidth = 2.5;
            // 5 here is the number of objects in status Category
            item.canvasWidth = config.threatCoeffiX * (datasetSum - (5 - 2)) + 3 * config.indentation - 5 * item.galleryRadius;
            item.canvasHeight = 660;
            item.visible = visible(d);
        } else if(state.selectedButton === 'conservation'){
            item.x = d.x;
            item.y = d.y;
            item.galleryRadius = d.r;
            item.depth = d.depth;
            item.defsRadius = 2 * item.galleryRadius;
            item.strokewidth = 3;
            item.canvasWidth = 1051.4;
            item.canvasHeight = 660;
            item.visible = true;
        }

        item.code = dPre.code;//picture index

        item.panelData = {
        sciName: dPre.name,
        normalName: dPre.normalName,
        status: dPre.status,
        trend: dPre.trend
        }

        return item;  
    });

    return layoutData;
 }
