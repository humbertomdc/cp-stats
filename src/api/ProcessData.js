export const toChartData = (data) => {
    const getFormattedDate = (date) => {
        return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    }
    return data.map(function(rate) {
        var date = new Date(rate.ratingUpdateTimeSeconds * 1000)
        date = getFormattedDate(date);
        return {
            x: date,
            y: rate.newRating,
            contestId: rate.contestId,
            contestName: rate.contestName,
            rank: rate.rank,
            oldRating: rate.oldRating
        }
    });
}

export const rangeBetweenDates = (start, end) => {
    start = Date.parse(start);
    end = Date.parse(end);

    var arr = [];
    var dt = new Date(start);

    while (dt <= end) {
        arr.push(new Date(dt).toString());
        dt.setDate(dt.getDate() + 1);
    }

    return arr;
}