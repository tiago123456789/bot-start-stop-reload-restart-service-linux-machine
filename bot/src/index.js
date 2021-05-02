require("./config/LoadEnvironmentVariable");
const venomBot = require("venom-bot");
const Actions = require("./constant/Actions");
const Interaction = require("./models/Interaction");
const InteractionPerUser = require("./models/InteractionPerUser");
const agentRepository = require("./repository/AgentRepository");
const publisher = require("./pubSub/Publisher");

(async () => {

    const agents = await agentRepository.getAgents();

    const mapCommands = {};
    const mapActions = {};

    const actions = Actions.map((item, indice) => {
        mapActions[indice] = item;
        return `*${indice}* - ${item}`;
    });

    const commands = agents.map((item, indice) => {
        mapCommands[indice] = item;
        return `*${indice}* - ${item.name}`;
    });

    const interactionPerUser = new InteractionPerUser(
        [
            new Interaction(
                `Selecione o agente que irá executar o comando:\n${commands.join("\n")}`,
                (value, commandPerUser) => {
                    commandPerUser.data.agent = mapCommands[value].token;
                },
                (value) => {
                    return mapCommands[value] != null
                }
            ),
            new Interaction(
                `Selecione alguma das ações e digite o nome do serviço(Ex: 0 service_name):\n${actions.join("\n")}`,
                (value, commandPerUser) => {
                    value = value.split(/\s/);
                    commandPerUser.data.command = mapActions[value[0]].toLowerCase();
                    commandPerUser.data.service = value[1];
                },
                (value) => {
                    value = value.split(/\s/)[0];
                    return mapActions[value] != null
                }
            ),
        ]
    );


    venomBot
        .create()
        .then(client => {
            client.onMessage(async message => {
                if (!message.from.endsWith("@c.us")) {
                    return;
                }

                if (interactionPerUser.isFirstInteraction(message.from)) {
                    interactionPerUser.registerFirstInteraction(message.from);
                    const command = interactionPerUser.getCurrentInteractionByUser(message.from).command;
                    await client.sendText(message.from, command);
                    return;
                }

                try {
                    if (!interactionPerUser.getCurrentInteractionByUser(message.from).validate(message.body)) {
                        client.sendText(message.from, "Valor digitado é inválido!!!");
                        return;
                    }

                    if (interactionPerUser.isFinishInteraction(message.from)) {
                        const user = interactionPerUser.getUserByCellphone(message.from);
                        interactionPerUser
                            .getCurrentInteractionByUser(message.from)
                            .action(message.body, user);

                        const data = interactionPerUser.getUserByCellphone(message.from).data;

                        publisher
                            .createChannel("channel-action")
                            .publish("test", data, (err, data) => {
                                if (err) {
                                    console.log(err)
                                    return;
                                }
                                interactionPerUser.resetInteractionOneUser(message.from);
                            });

                        return;
                    }

                    const user = interactionPerUser.getUserByCellphone(message.from);
                    interactionPerUser
                        .getCurrentInteractionByUser(message.from)
                        .action(message.body, user);
                    interactionPerUser.nextInteractionByUser(message.from);

                    const command = interactionPerUser
                        .getCurrentInteractionByUser(message.from).command;
                    await client.sendText(message.from, command);

                } catch (error) {
                    console.log(error);
                }
            })
        })
})()
