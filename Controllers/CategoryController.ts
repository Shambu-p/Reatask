import {CreateCategoryCommand} from "../Application/CategoryModule/Commands/CreateCategoryCommand/CreateCategoryLogic";
import Response from "../Application/Common/Response";

module.exports.controller = function (app: any, application: any){

    app.get("/createCategory", ({body}: {body: CreateCategoryCommand}, res: any, next: any) => {
        try{
            res.json(application.createCategoryRequest(body))
        } catch(error){
            res.json(Response.responed(error.message));
        }
    });
}