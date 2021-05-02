const { execSync } = require("child_process");

class ShellCommand {

    constructor(password) {
        this._password = password;
    }

    _execute(service, action) {
        return execSync(`echo "${this._password}" | sudo -S service ${service} ${action}`);
    }

    start(service) {
        return this._execute(service, "start");
    }

    stop(service) {
        return this._execute(service, "stop");
    }

    reload(service) {
        return this._execute(service, "reload");
    }

    restart(service) {
        return this._execute(service, "restart");
    }
}


module.exports =  ShellCommand;