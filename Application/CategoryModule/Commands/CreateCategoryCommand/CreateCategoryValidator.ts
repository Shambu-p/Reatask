import {CreateCategoryCommand} from "./CreateCategoryLogic";
import NiceValidation from "../../../Common/Models/NiceValidation";

export default class CreateCategoryValidator extends NiceValidation<CreateCategoryCommand> {

    constructor(command: CreateCategoryCommand) {
        super(command);
    }

    Validate() {
        this.Rule("name", prop =>
            prop.MaxLength(10)
                .MinLength(6)
        );
    }
}