export const rankColor = (rating) => {
    if (rating < 1200) return "grey";
    if (rating < 1400) return "green";
    if (rating < 1600) return "teal";
    if (rating < 1900) return "blue";
    if (rating < 2100) return "purple";
    if (rating < 2400) return "yellow";
    if (rating >= 2400) return "red";
    return "black";
}

export const rank = (rating) => {
    if (rating < 1200) return "Newbie";
    if (rating < 1400) return "Pupil";
    if (rating < 1600) return "Specialist";
    if (rating < 1900) return "Expert";
    if (rating < 2100) return "Candidate Master";
    if (rating < 2300) return "Master";
    if (rating < 2400) return "International Master";
    if (rating < 2600) return "Grandmaster";
    if (rating < 3000) return "International Grandmaster";
    if (rating >= 3000) return "Legendary Grandmaster";
    return "Undefined";
}

export const verdictIds = () => {
    return (
        [
            "AC",
            "WA",
            "CPE",
            "TLE",
            "RTE",
            "MLE",
            "OTHER"
        ]
    );
}

export const getVerdictId = (verdict) => {
    const ids = verdictIds();
    switch (verdict) {
        case "OK":
            return ids[0];
        case "WRONG_ANSWER":
            return ids[1];
        case "COMPILATION_ERROR":
            return ids[2];
        case "TIME_LIMIT_EXCEEDED":
            return ids[3];
        case "RUNTIME_ERROR":
            return ids[4];
        case "MEMORY_LIMIT_EXCEEDED":
            return ids[5];
        default:
            return ids[6];
    }
}
