export const parseRatingData = (data) => {
    return data.map(function(rate) {
        var date = new Date(rate.ratingUpdateTimeSeconds * 1000)
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const formattedDate = year + "-" + month + "-" + day;
        return {
            x: formattedDate,
            y: rate.newRating,
            contestId: rate.contestId,
            contestName: rate.contestName,
            rank: rate.rank,
            oldRating: rate.oldRating
        }
    });
}

export const parseVeredictData = (data) => {
    var dataMap = new Map();
    data.forEach(element => {
        if (!dataMap.has(element.verdict)) {
            dataMap.set(element.verdict, 1);
        }
        else {
            const newVal = dataMap.get(element.verdict) + 1;
            dataMap.delete(element.verdict);
            dataMap.set(element.verdict, newVal);
        }
    })
    
    return Array.from(dataMap).map(function(pair) {
        return {
            id: pair[0],
            value: pair[1],
        }
    });
}

export const parseTagsData = (data) => {
    var dataMap = new Map();
    var total = 0;
    data.forEach(element => {
        if (element.verdict === "OK") {
            total += 1;
            element.problem.tags.forEach(tag => {
                if (!dataMap.has(tag)) {
                    dataMap.set(tag, 1);
                }
                else {
                    const newVal = dataMap.get(tag) + 1;
                    dataMap.delete(tag);
                    dataMap.set(tag, newVal);
                }
            });
        }
    });
    
    return [Array.from(dataMap).map(function(pair) {

        return {
            id: pair[0],
            value: pair[1],
        }
    }), total];
}

export const parseUsersData = (data, binSize, userRating) => {
    var arr = [];
    for (var i = binSize; i < 3800; i += binSize) {
        arr.push(
            {
                x: i - binSize,
                y: 0,
                binSize: binSize,
            }
        )
    }
    
    var pos = null;
    var index = 0;
    data.forEach(user => {
        var idx = parseInt((user.rating / binSize).toFixed(0));
        if (idx >= 0 && arr[idx]) {
            arr[idx].y++;
        }
        else {
            arr[0].y++;
        }
        if (!pos && userRating === user.rating) {
            pos = index;
        }
        index++;
    });
    var place = Math.floor(100 * (data.length - pos) / data.length);

    var res = [];
    var ratings = [0, 1200, 1400, 1600, 1900, 2100, 2400, 3800 ]
    var colors = [ "rgba(97, 97, 97, 1)", "rgba(97, 97, 97, 1)", "rgba(119, 221, 119, 1)", "rgba(97, 205, 187, 1)",
                   "rgba(114, 211, 254, 1)", "rgba(194, 157, 253, 1)", "rgba(241, 225, 91, 1)", "rgba(244, 117, 96, 1)" ]
    var idx = 0;
    var entries = [];
    var prev = {x: ratings[idx], y: 0}
    arr.forEach(entry => {
        if (entry.x >= ratings[idx]) {
            res.push(
                {
                    id: ratings[idx],
                    place: place,
                    color: colors[idx],
                    data: entries
                }
            );
            entries = [prev];
            idx++;
        }
        entries.push(entry);
        prev = entry;
    })
    res.push(
        {
            id: ratings[idx],
            place: place,
            color: colors[idx],
            data: entries
        }
    );

    return res;
}