const fs = require("fs");
const HttpClient = require("../utils/HttpClient");

const PATH_CREDENTIAL = "./.credential/data.json";
const httpClient = new HttpClient();

module.exports = async () => {
    if (fs.existsSync(PATH_CREDENTIAL)) {
        return require("../../.credential/data.json");
    }

    const dataCommand = process.argv.slice(2)
    const password = dataCommand[0];
    const data = await httpClient.post(process.env.URL_API, { name: dataCommand[1] });
    data.password = password;
    fs.mkdirSync("./.credential");
    fs.writeFileSync(PATH_CREDENTIAL, JSON.stringify(data));
    return data;
};

