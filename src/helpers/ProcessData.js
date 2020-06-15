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