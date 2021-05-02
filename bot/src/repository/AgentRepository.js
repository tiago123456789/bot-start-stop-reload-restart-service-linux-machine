const HttpClient = require("../util/HttpClient");

module.exports = {

    getAgents() {
        return HttpClient.get(process.env.URL_API);
    }
}