class InteractionPerUser {

    constructor(interactions) {
        this.commandPerUser =  {};
        this.interactions = interactions;
    }

    isFirstInteraction(from) {
        return this.commandPerUser[from] == null;
    }

    isFinishInteraction(from) {
        if (!this.commandPerUser[from]) {
            return true;
        }
        const option = this.commandPerUser[from].command;
        return option == (this.interactions.length - 1);
    }

    registerFirstInteraction(from) {
        this.commandPerUser[from] = { command: 0, data: {} };
    }

    getUserByCellphone(cellphone) {
        return this.commandPerUser[cellphone];
    }

    getCurrentInteractionByUser(from) {
        const option = this.commandPerUser[from].command;
        return this.interactions[option];
    }

    nextInteractionByUser(from) {
        this.commandPerUser[from].command += 1;
    }

    resetInteractionOneUser(from) {
        delete this.commandPerUser[from];
    }
}

module.exports = InteractionPerUser;