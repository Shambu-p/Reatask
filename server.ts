import ConfigurationService from "./Services/ConfigurationService";
import express from 'express';
import fs from 'fs';

// const bodyParser = require('body-parser');
// const fs = require('fs');
// const express = require('express');

const app = express();
const router = express.Router();
const ApplicationLibrary = require("./Application/ApplicationLibrary");
const InfrastructureLibrary = require("./Infrastructure/InfrastructureLibrary");

try{

    const configuration = new ConfigurationService("./configuration.json");
    const port = configuration.getConfiguration("ServerPort");
    const infrastructure = InfrastructureLibrary(configuration);
    const application = ApplicationLibrary(infrastructure.Database, infrastructure.Authentication);

    // app.use(cors());

    app.get("/", (req, res, next) => {
        res.send("hello");
    });

    fs.readdirSync("controllers").forEach(function (file) {
        if (file.substr(-3) == ".js") {
            const route = require("./Controllers/" + file);
            route.controller(app, application);
        }
    });

    app.listen(port, function () {
        console.log(`api running on port ${port}`);
    });

} catch(error: any){
    console.log(error.message);
}