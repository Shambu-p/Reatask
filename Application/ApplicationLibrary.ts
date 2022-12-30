import AuthenticationInterface from "./Common/Interfaces/AuthenticationInterface";
import {
    CreateCategoryCommand,
    CreateCategoryLogic
} from "./CategoryModule/Commands/CreateCategoryCommand/CreateCategoryLogic";
import Response from "./Common/Response";
import CreateCategoryValidator from "./CategoryModule/Commands/CreateCategoryCommand/CreateCategoryValidator";
import IContext from "./Common/Interfaces/IContext";
import Category from "../Domain/Entities/Category";
import { GetCategories, GetCategoriesHandler } from "./CategoryModule/Queries/GetAllCategories/GetCategories";
import PaginatedListInterface from "./Common/Interfaces/PaginatedListInterface";

export default function (db: IContext, auth: AuthenticationInterface) {
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
        },

        getAllCategories: async function (command: GetCategories): Promise<PaginatedListInterface<Category>> {
            // new CreateCategoryValidator(command).Validate();
            return await new GetCategoriesHandler(this.Database).Handle(command);
        }
    }
};