import axios from 'axios';

export const getUserInfo = (handle) => {
    return axios.get("https://codeforces.com/api/user.info", {
        params: {
            handles: handle
        }
    })
    .then(response => response.data.result[0])
    .catch(error => error.response.status)
}

export const getUserRating = (handle) => {
    return axios.get("https://codeforces.com/api/user.rating", {
        params: {
            handle: handle
        }
    }).then(response => response.data.result);
}

export const getUserStatus = (handle) => {
    return axios.get("https://codeforces.com/api/user.status", {
        params: {
            handle: handle
        }
    }).then(response => response.data.result);
}

export const getRatedList = (activeOnly) => {
    return axios.get("https://codeforces.com/api/user.ratedList", {
        params: {
            activeOnly: activeOnly
        }
    }).then(response => response.data.result);
}
