import ConfigurationService from "./Services/ConfigurationService";
import express from 'express';
import fs, { appendFile } from 'fs';
import InfrastructureLibrary from "./Infrastructure/InfrastructureLibrary";
import ApplicationLibrary from "./Application/ApplicationLibrary";

const app = express();
const router = express.Router();

try{

    const configuration = new ConfigurationService("./configuration.json");
    const port = configuration.getConfiguration("ServerPort");
    const infrastructure = InfrastructureLibrary(configuration);
    const application = ApplicationLibrary(infrastructure.Database, infrastructure.Authentication);

    // app.use(cors());

    app.get("/", async (req, res, next) => {
        
    });

    fs.readdirSync("Controllers").forEach(function (file) {
        if (file.substr(-3) == ".ts") {
            const route = require("./Controllers/" + file);
            route.controller(app, application)
        }
    });

    module.exports = app;
    
    app.listen(port, function () {
        console.log(`api running on port ${port}`);
    });

} catch(error: any){
    console.log(error.message);
}