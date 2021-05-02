const Ably = require("ably");

class Subscriber {

    constructor() {
        this._realtime = new Ably.Realtime(process.env.ABLY_APIKEY);
        this._channel;
    }

    createChannel(name) {
        this._channel =  this._realtime.channels.get(name);
        return this;
    }

    listen(name, callback) {
        return this._channel.subscribe(name, callback);
    }
    
    

}


module.exports = new Subscriber();