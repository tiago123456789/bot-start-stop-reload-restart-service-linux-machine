require("./config/LoadEnvironmentVariable")
require("./config/Database");

const express = require("express");
const app = express();
const routesApp = require("./routes");

// Enable middleware parse data for json.
app.use(express.json());

// Load routes the application.
routesApp(app);

app.listen(
    process.env.PORT, 
    () => console.log(`Server is running: ${process.env.URL_APP}`) 
);