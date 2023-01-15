import ConfigurationService from "./Services/ConfigurationService";
import express from 'express';
import fs from 'fs';
import InfrastructureLibrary from "./Infrastructure/InfrastructureLibrary";
import ApplicationLibrary from "./Application/ApplicationLibrary";
import bodyParser from "body-parser";
import Response from "./Application/Common/Response";

const app = express();
const router = express.Router();

try {

    const configuration = new ConfigurationService("./configuration.json");
    const port = configuration.getConfiguration("ServerPort");
    const infrastructure = InfrastructureLibrary(configuration);
    const application = ApplicationLibrary(infrastructure.Database, infrastructure.Authentication);

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    /**
     * authentication will be checked here
     */
    app.use(async (req, res, next) => {

        //get all the headers as map
        let headerMap = new Map<string, any>(Object.entries(req.headers));

        //check if the header has the authentication key
        if (headerMap.has(infrastructure.Authentication.TokenName)) {
            try {

                //get the token based on the developer configuration setup
                let token: string = headerMap.get(infrastructure.Authentication.TokenName);

                infrastructure.Authentication.Authorize(token);

            } catch (error: any) {
                res.json(Response.responed(`${error.message}, Access Denied!`, 400));
            }
        }

        next();

    });

    app.get("/", async (req, res, next) => {
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

} catch (error: any) {
    console.log(error.message);
}