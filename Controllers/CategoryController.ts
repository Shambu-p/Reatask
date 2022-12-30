import {CreateCategoryCommand} from "../Application/CategoryModule/Commands/CreateCategoryCommand/CreateCategoryLogic";
import Response from "../Application/Common/Response";

module.exports.controller = function (app: any, application: any){

    // app.get("/createCategory", ({body}: {body: CreateCategoryCommand}, res: any, next: any) => {
    //     try{
    //         res.json(application.createCategoryRequest(body))
    //     } catch(error: any){
    //         res.json(Response.responed(error.message));
    //     }
    // });
    
    app.get("/createCategory", async (req: any, res: any, next: any) => {
        try{
            //{body}: {body: CreateCategoryCommand}
            let command: CreateCategoryCommand = {Name: "gooder"};
            res.json(await application.createCategoryRequest(command));
        } catch(error: any){
            res.json(Response.responed(error.message));
        }
    });

    return app;
}