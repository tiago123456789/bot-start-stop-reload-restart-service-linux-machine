require("./config/LoaderEnvironmentVaraible");
const initializeAgentCommand = require("./commands/InitializeAgentCommand");
const actionCommand = require("./commands/ActionCommand");
const subscriber = require("./pubSub/Subscriber");

(async () => {
    credential = await initializeAgentCommand();
    subscriber
        .createChannel("channel-action")
        .listen("test", (message) => actionCommand(message, credential.password));
})();


