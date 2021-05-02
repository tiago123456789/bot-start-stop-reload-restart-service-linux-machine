const Ably = require("ably");

class Publisher {

    constructor() {
        this._realtime = new Ably.Realtime(process.env.ABLY_APIKEY);
    }

    createChannel(name) {
        return this._realtime.channels.get(name);
    }
    

}


module.exports = new Publisher();