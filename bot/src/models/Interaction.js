class Interaction {

    constructor(command, action, validate) {
        this.command = command;
        this.action = action;
        this.validate = validate;
    }

    action(data) {
        return this.action(data);
    }

    validate(data) {
        console.log(data);
        return this.validate(data);
    }

}

module.exports = Interaction;