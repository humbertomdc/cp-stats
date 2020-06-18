// Helper variables.
var index = 0;
var valsCounter = 0;

/**
 * Update helper counters that keep record of
 * what label we are at.
 */
const updateCounters = () => {
    valsCounter++;
    // When the counter is equal to 2 this means that we
    // are moving to a new lable so we reset it to 0 and
    // increase the index by 1.
    // We pick number 2 because we have 2 variables in our data,
    // approximateRating and acceptanceRate.
    if (valsCounter === 2) {
        index++;
        valsCounter = 0;
    }
}

/**
 * Format radar's chart tooltip labels.
 * @param  {[Object]} data Data used for the radar chart.
 * @return {String}        Value for a specific label.
 */
export const formatTootltipLabels = (data) => {
    const object = data[index % data.length];
    // Update helper counter and index.
    updateCounters();
    if (valsCounter === 0) {
        return (100 * object.acceptanceRate / object.approximateRating).toFixed(0) + "%";
    }

    return object.approximateRating;
}

/**
 * Format radar's chart dot labels.
 * @param  {[Object]} data Data used for the radar chart.
 * @return {String}        Value for a specific label.
 */
export const formatDotLabels = (data) => {
    const object = data[index % data.length];
    // Update helper counter and label.
    updateCounters();
    if (valsCounter === 0) {
        return "";
    }

    return object.approximateRating;
}
