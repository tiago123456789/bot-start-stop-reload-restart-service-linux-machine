
const { v4 } = require("uuid");
const authorizationMiddleware = require("../middlewares/AuthorizationMiddleware");
const agentRepository = require("../repositories/AgentRepository");

module.exports = (app) => {

    app.get("/agents", authorizationMiddleware, async (request, response) => {
        const agents = await agentRepository.getAll();  
        response.json(agents);
    });
    
    app.post("/agents", authorizationMiddleware, async (request, response) => {
        const agentCreated = await agentRepository.create({
            ...request.body,
            token: v4() 
        });
    
        response.json({
            token: agentCreated.token,
            name: agentCreated.name
        });
    });
}