import AuthenticationInterface from "./Common/Interfaces/AuthenticationInterface";
import {
    CreateCategoryCommand,
    CreateCategoryLogic
} from "./CategoryModule/Commands/CreateCategoryCommand/CreateCategoryLogic";
import Response from "./Common/Response";
import CreateCategoryValidator from "./CategoryModule/Commands/CreateCategoryCommand/CreateCategoryValidator";
import IContext from "./Common/Interfaces/IContext";

module.exports = function (db: IContext, auth: AuthenticationInterface) {
    return {
        Database: db,
        Authentication: auth,

        /**
         * this method could throw validation errors
         * @param command
         */
        createCategoryRequest: async function (command: CreateCategoryCommand): Promise<Response> {
            new CreateCategoryValidator(command).Validate();
            return await new CreateCategoryLogic(this.Database).Handle(command);
        }
    }
};