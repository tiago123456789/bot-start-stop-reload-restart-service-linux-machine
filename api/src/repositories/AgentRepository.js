const agentCollection = require("../collections/AgentCollection")

module.exports = {

    getAll() {
        return agentCollection.find({});
    },

    create(data) {
        return agentCollection.create(data);
    }
}