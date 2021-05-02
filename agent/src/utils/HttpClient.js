const { default: axios } = require("axios");

module.exports = class HttpClient {

    get(url) {
        return axios.get(url).then(this._extractResponseBody);
    }

    post(url, data) {
        return axios.post(url, data).then(this._extractResponseBody);
    }

    _extractResponseBody(response) {
        if (response.data) {
            return response.data;
        }
        return response;
    }
}