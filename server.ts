import ConfigurationService from "./Services/ConfigurationService";
import express from 'express';
import fs, { appendFile } from 'fs';
import InfrastructureLibrary from "./Infrastructure/InfrastructureLibrary";
import ApplicationLibrary from "./Application/ApplicationLibrary";
import bodyParser from "body-parser";
import Authentication from "./Infrastructure/Authentication/Authentication";

const app = express();
const router = express.Router();

try{

    const configuration = new ConfigurationService("./configuration.json");
    const port = configuration.getConfiguration("ServerPort");
    const infrastructure = InfrastructureLibrary(configuration);
    const application = ApplicationLibrary(infrastructure.Database, infrastructure.Authentication);

    // app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(async (req, res, next) => {
        console.log(req.headers);
        console.log("Authentication started ..... ");
        Authentication.User = "authenticated";
        next();
    });

    app.get("/", async (req, res, next) => {
        console.log(Authentication.User);
        res.json({
            statusCode: 200,
            message: "Wellcome to Retask REST API developed with node js, express using Clean Architecture Design patter."
        });
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