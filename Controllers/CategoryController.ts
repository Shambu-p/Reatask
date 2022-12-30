import {CreateCategoryCommand} from "../Application/CategoryModule/Commands/CreateCategoryCommand/CreateCategoryLogic";
import Response from "../Application/Common/Response";

module.exports.controller = function (app: any, application: any){

    app.get("/api/Category/:pageNumber/:pageSize", async (req: any, res: any, next: any) => {
        try{
            res.json(await application.getAllCategories({
                PageSize: req.params.pageSize,
                PageNumber: req.params.pageNumber
            }));
        } catch(error: any){
            res.json(Response.responed(error.message));
        }
    });
    
    app.post("/api/Category", async ({body}: {body: CreateCategoryCommand}, res: any, next: any) => {
        try{
            res.json(await application.createCategoryRequest(body));
        } catch(error: any){
            res.json(Response.responed(error.message));
        }
    });

}