import DatabaseInterface from "../../../Common/Interfaces/IDBTable";
import Response from "../../../Common/Response";
import HandlerInterface from "../../../Common/Interfaces/HandlerInterface";
import IContext from "../../../Common/Interfaces/IContext";

export interface CreateCategoryCommand {
    Name: string
}

export class CreateCategoryLogic implements HandlerInterface<CreateCategoryCommand, Response> {

    Database: IContext

    constructor(db: IContext){
        this.Database = db;
    }

    async Handle(request: CreateCategoryCommand): Promise<Response> {
        // let categories = await this.Database.Categories.Records();
        // categories.All();
        return Response.Succeded("operation successful");
    }

}