const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
    name: String,
    token: String
});

module.exports = mongoose.model("agent", agentSchema);