import DatabaseInterface from "../../../Common/Interfaces/DatabaseInterface";
import Response from "../../../Common/Response";
import HandlerInterface from "../../../Common/Interfaces/HandlerInterface";

export class CreateCategoryCommand {
    Name: string
}

export class CreateCategoryLogic implements HandlerInterface<CreateCategoryCommand, Response> {

    Database: DatabaseInterface

    constructor(db: DatabaseInterface){
        this.Database = db;
    }

    Handle(request: CreateCategoryCommand): Response {
        //todo: implement Create category logic
        throw new Error("not implemented yet");
    }

}