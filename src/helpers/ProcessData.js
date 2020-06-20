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
    const res = Array.from(dataMap).map(pair => {
        return {
            id: pair[0],
            value: pair[1],
        }
    });

    return res;
}

/**
 * Create bins accordingly to bin size.
 * @param  {Number}   binSize Size for each bin (rating range).
 * @return {[Object]}         Array of bins.
 */
const createBins = (binSize) => {
    var arr = [];
    // Iterate over all the possible ratings in codeforces
    // and create a bin of a given size.
    for (var i = binSize; i < 3800; i+= binSize) {
        // Bin with its required parameters.
        const bin = {
            x: i - binSize,
            y: 0,
            binSize: binSize,
            percentage: 0,
        }
        arr.push(bin);
    }
    return arr;
}

// TODO: Clean and document this function.
export const parseUsersData = (data, binSize, userRating) => {
    // Create bins according to the given bin size.
    var arr = createBins(binSize);

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

/**
 * Gets the average value from an array.
 * If the length of the array is greater than maxSize
 * then just the values from 0...maxSize are taken into account.
 * @param  {[Number]} arr     Array of numbers.
 * @param  {Number}   maxSize The max size for the array.
 * @return {Number}           Average value in array.
 */
const tagAverageValue = (arr, maxSize) => {
    // Sort the array in descending order.
    var sortedArr = arr.sort(function(a, b) { return b - a; });
    // If there are more than 10 items in the array we just take the first 10.
    if (sortedArr.length >= maxSize) {
        sortedArr = sortedArr.slice(0, maxSize);
    }
    // Return the average value of the array.
    const avg = sortedArr.reduce((a, b) => a + b, 0) / sortedArr.length;
    return Math.floor(avg);
}

/**
 * Gets the frequency of tags from all problems.
 * @param  {[String]} tags    Tags in a problem.
 * @param  {Map}      tagsMap Map that stores frequency of tags.
 * @return {Map}              Updated tagsMap.
 */
const getTagsFrequency = (tags, tagsMap) => {
    // Iterate over each tag in the array and add 1 to
    // the corresponding element in the map for each occurrence.
    tags.forEach(tag => {
        if (!tagsMap.has(tag)) {
            tagsMap.set(tag, 1);
        }
        else {
            const value = tagsMap.get(tag);
            tagsMap.delete(tag);
            tagsMap.set(tag, value + 1);
        }
    });
    return tagsMap;
};

/**
 * Gets the rating from each problem and adds it to the array of
 * the corresponding tag.
 * Arrays are organized in a map with tag as key.
 * @param  {[String]} tags          Tags in a problem.
 * @param  {Number}   problemRating Rating for a particular problem.
 * @param  {Map}      solvedTagMap  Map of ratings for each tag.
 * @return {Map}                    Updated solvedTagMap.
 */
const getSolvedTagsRatings = (tags, problemRating, solvedTagMap) => {
    // The problem might have not rating so we check
    // that problem rating is a number.
    if (problemRating) {
        // Iterate over each tag in the tags array and push
        // each problem rating to the corresponding array in
        // in solvedTagMap.
        tags.forEach(tag => {
            if (!solvedTagMap.has(tag)) {
                solvedTagMap.set(tag, [problemRating]);
            }
            else {
                solvedTagMap.get(tag).push(problemRating);
            }
        });
    }
    return solvedTagMap;
}

/**
 * Get strengths by tag and acceptance rate.
 * @param  {[Object]} data Data receivde from the codeforces api.
 * @return {[Object]}      Data ready to be presented in a chart.
 */
export const parseStrengthsByTagData = (data) => {
    var solvedTagMap = new Map();
    var solvedSet = new Set();
    var tagsMap = new Map();
    data.forEach(element => {
        // Get the unique id for each problem.
        // ContestId followed by the problem index.
        // Ex. 123B
        const problemId = element.problem.contestId + element.problem.index;
        // Get array of tags for each problem.
        const tags = element.problem.tags;
        // Add the key to the set if the verdict is equal to "OK"
        // and the key does not exist in the set.
        if (!solvedSet.has(problemId) && element.verdict === "OK") {
            solvedSet.add(problemId);
            const problemRating = element.problem.rating;
            // Update solvedTagMap.
            solvedTagMap = getSolvedTagsRatings(tags, problemRating, solvedTagMap);
        }
        // Update tagsMap.
        tagsMap = getTagsFrequency(tags, tagsMap);
    });

    // Organize data in a presentable format and return it.
    const res = Array.from(solvedTagMap).map(pair => {
        const avg = tagAverageValue(pair[1], 5);
        const acceptanceRate = (avg * pair[1].length / tagsMap.get(pair[0])).toFixed(2);
        return {
            tag: pair[0],
            approximateRating: avg,
            acceptanceRate: acceptanceRate,
        }
    });

    return res;
}

const yearsSinceRegistration = (seconds) => {
    const currentTime = new Date().getTime() / 1000;
    const timeDiff = parseInt(currentTime) - parseInt(seconds);
    return timeDiff / 31536000;
}

const getIndexForRankByTime = (rating) => {
    if (rating < 1200) return 0;
    if (rating < 1400) return 1;
    if (rating < 1600) return 2;
    if (rating < 1900) return 3;
    if (rating < 2100) return 4;
    if (rating < 2400) return 5;
    if (rating >= 2400) return 6;
}

/**
 * Initializes the array used to get rating vs time
 * of experience data.
 * @return {[Object]} Initialized array.
 */
const initDataArray = () => {
    var arr = [];
    for (var i = 0; i < 7; i++) {
        const group = {
            // Id and data are required but group is used to
            // determine the current user being analyzed index.
            id: i,
            group: null,
            data: [],
        }
        arr.push(group);
    }
    return arr;
}

/**
 * Get the current user data point index in rating
 * by time of experience data.
 * @param  {[Object]} arr Rating  by time of experience data.
 * @return {[Object]}     Updated data array.
 */
const getUserIndex = (arr) => {
    var index = 0;
    // Iterate over every data point in the data until
    // the user being analyzed is found.
    arr.forEach(element => {
        for (var i = 0; i < element.data.length; i++) {
            if (element.data[i].id === "good") {
                arr[0].group = index;
                break;
            }
            index++;
        }
    });
    return arr;
}

/**
 * TODO: Document this function.
 */
export const parseRankByTimeOfExperience = (data, userInfo) => {
    // Initial variables.
    var res = initDataArray();
    const colors = Colors.codeforcesScheme1();
    var counter = 0, x = 0, y = 0;
    var index;
    // Iterate over each users and for every "n" users, calculate the average
    // rating and time since registration for that particular group.
    data.forEach((user) => {
        // Get time since registration in years.
        const timeSinceRegistration = yearsSinceRegistration(user.registrationTimeSeconds);
        // If the current user is the same as the user being analyzed then create a
        // data point for that user, this will be used to show his position in the
        // scatter plot.
        if (user.handle === userInfo.handle) {
            index = getIndexForRankByTime(user.rating);
            const dataPoint = {
                id: "good",
                x: user.rating,
                y: timeSinceRegistration,
                color: colors[index],
            }
            res[index].data.push(dataPoint);
        }
        // Else we continue calculcating the average for every "n" users.
        else {
            x += user.rating;
            y += timeSinceRegistration;
            counter++;
            if (counter === 100) {
                index = getIndexForRankByTime(x / counter);
                const dataPoint = {
                    id: "bad",
                    x: x / counter,
                    y: y / counter,
                    color: colors[index],
                }
                res[index].data.push(dataPoint)
                // Reset the group data to their initial values.
                x = 0;
                y = 0;
                counter = 0;
            }
        }
    });
    // Find user being analyzed index.
    res = getUserIndex(res);
    return res;
}
