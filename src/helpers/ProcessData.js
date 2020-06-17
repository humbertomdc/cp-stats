import * as Colors from './Colors';
import * as CodeforcesData from './CodeforcesData';

/**
 * Transforms date in seconds to a yyyy-mm-dd fromat.
 * @param  {Number} date Date in seconds.
 * @return {String}      Formatted date.
 */
const parseDate = (date) => {
    const newDate = new Date(date * 1000);
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const day = newDate.getDate();
    return year + "-" + month + "-" + day;
}

/**
 * Formats user's info data for presentation.
 * @param  {[Object]} data Data received from the codeforces api.
 * @return {[Object]}      Data ready to be presented.
 */
export const parseRatingData = (data) => {
    return data.map(function(rate) {
        const formattedDate = parseDate(rate.ratingUpdateTimeSeconds);
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

/**
 * Formats user's status data for presenting it in a chart.
 * @param  {[Object]} data Data received from the codeforces api.
 * @return {[Object]}      Data ready to be presented in a chart.
 */
export const parseVeredictData = (data) => {
    var dataMap = new Map();
    data.forEach(element => {
        const id = CodeforcesData.getVerdictId(element.verdict);
        // Check if verdict exists in map.
        // If it do not exist add the key with value initialized in 1.
        if (!dataMap.has(id)) {
            dataMap.set(id, 1);
        }
        // Else just add one to the count.
        else {
            const newVal = dataMap.get(id) + 1;
            dataMap.delete(id);
            dataMap.set(id, newVal);
        }
    })
    // Organize data and return it.
    const res = Array.from(dataMap).map(function(pair) {
        return {
            id: pair[0],
            value: pair[1],
        }
    });

    return res;
}

/**
 * Gets the total number of problems solved by the user.
 * @param  {[Object]} data Data received from codeforces api.
 * @return {Number}        Number of problems solved.
 */
export const totalSolved = (data) => {
    var solvedSet = new Set();
    data.forEach(element => {
        // Get the unique id for each problem.
        // ContestId followed by the problem index.
        // Ex. 123B
        const key = element.problem.contestId + element.problem.index;
        // Add the key to the set if the verdict is equal to "OK"
        // and the key does not exist in the set.
        if (element.verdict === "OK" && !solvedSet.has(key)) {
            solvedSet.add(key);
        }
    });

    return solvedSet.size;
}

/**
 * Get the count  of problems solved for each tag.
 * @param  {[Object]} data Data received from the codeforces api.
 * @return {[Object]}      Data ready to be presented in a chart.
 */
export const parseTagsData = (data) => {
    var dataMap = new Map();
    var solvedSet = new Set();
    data.forEach(element => {
        // Get the unique id for each problem.
        // ContestId followed by the problem index.
        // Ex. 123B
        const key = element.problem.contestId + element.problem.index;
        // Add the key to the set if the verdict is equal to "OK"
        // and the key does not exist in the set.
        if (element.verdict === "OK" && !solvedSet.has(key)) {
            solvedSet.add(key);
            // Add one to every value in dataMap with tag as key.
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
    // Organize data and return it.
    const res = Array.from(dataMap).map(function(pair) {
        return {
            id: pair[0],
            value: pair[1],
        }
    });

    return res;
}

// TODO: Clean and document this function.
export const parseUsersData = (data, binSize, userRating) => {
    var arr = [];
    for (var i = binSize; i < 3800; i += binSize) {
        arr.push(
            {
                x: i - binSize,
                y: 0,
                binSize: binSize,
                percentage: 0,
            }
        )
    }

    var pos = null;
    var index = 0;
    data.forEach(user => {
        var idx = Math.ceil(parseInt((user.rating / binSize)));
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
    var ratings = [ 1200, 1400, 1600, 1900, 2100, 2400, 3800 ]
    var rgbaColors = Colors.codeforcesScheme1();
    var idx = 0;
    var entries = [];
    var prev = {x: ratings[idx], y: 0}
    var accum = 0;
    var usersPerRank = 0;
    arr.forEach(entry => {
        entry.percentage = (100 * accum / data.length).toFixed(2);
        accum += entry.y;

        if (entry.x >= ratings[idx]) {
            res.push(
                {
                    id: ratings[idx],
                    place: place,
                    color: rgbaColors[idx],
                    usersPerRank: usersPerRank,
                    usersPerRankPercentage: (100 * usersPerRank / data.length).toFixed(2),
                    data: entries
                }
            );
            entries = [prev];
            usersPerRank = 0;
            idx++;
        }
        usersPerRank += entry.y;
        entries.push(entry);
        prev = entry;
    })
    res.push(
        {
            id: ratings[idx],
            place: place,
            color: rgbaColors[idx],
            usersPerRank: usersPerRank,
            usersPerRankPercentage: (100 * usersPerRank / data.length).toFixed(2),
            data: entries
        }
    );

    return res;
}
