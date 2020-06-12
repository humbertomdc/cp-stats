import axios from 'axios';

export const getUserInfo = (handle) => {
    return axios.get("https://codeforces.com/api/user.info", {
        params: {
            handles: handle
        }
    }).then(response => response.data.result[0]);
}

export const getUserRating = (handle) => {
    return axios.get("https://codeforces.com/api/user.rating", {
        params: {
            handle: handle
        }
    }).then(response => response.data.result);
}