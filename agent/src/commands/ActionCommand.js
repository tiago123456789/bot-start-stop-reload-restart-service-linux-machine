const ShellCommand = require("./ShellCommand");
const shellCommand = new ShellCommand();

module.exports = (message, password) => {
    const shellCommand = new ShellCommand(password);
    const data = message.data;
    if (data.agent != credential.token) {
        return;
    }
    shellCommand[data.command](data.service);
}