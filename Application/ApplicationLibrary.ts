import DatabaseInterface from "./Common/Interfaces/DatabaseInterface";
import AuthenticationInterface from "./Common/Interfaces/AuthenticationInterface";
import {
    CreateCategoryCommand,
    CreateCategoryLogic
} from "./CategoryModule/Commands/CreateCategoryCommand/CreateCategoryLogic";
import Response from "./Common/Response";
import CreateCategoryValidator from "./CategoryModule/Commands/CreateCategoryCommand/CreateCategoryValidator";

module.exports = function (db: DatabaseInterface, auth: AuthenticationInterface) {
    return {
        Database: db,
        Authentication: auth,

        /**
         * this method could throw validation errors
         * @param command
         */
        createCategoryRequest: function (command: CreateCategoryCommand): Response {
            new CreateCategoryValidator(command).Validate();
            return new CreateCategoryLogic(this.Database).Handle(command);
        }
    }
};