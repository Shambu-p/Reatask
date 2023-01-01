import Response from "../../../Common/Response";
import HandlerInterface from "../../../Common/Interfaces/HandlerInterface";
import IContext from "../../../Common/Interfaces/IContext";
import RecordsInterface from "../../../Common/Interfaces/RecordsInterface";
import Category from "../../../../Domain/Entities/Category";

export interface CreateCategoryCommand {
    Name: string
}

export class CreateCategoryLogic implements HandlerInterface<CreateCategoryCommand, Response> {

    Database: IContext

    constructor(db: IContext){
        this.Database = db;
    }

    async Handle(request: CreateCategoryCommand): Promise<Response> {
        
        this.Database.Categories.Add({
            Id: null, 
            Name: request.Name
        });

        let categories = await this.Database.Categories.Records();
        return Response.Succeded("operation successful");
    }

}