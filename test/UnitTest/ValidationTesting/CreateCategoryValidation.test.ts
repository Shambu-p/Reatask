import {expect} from 'chai';
import {CreateCategoryCommand} from "../../../Application/CategoryModule/Commands/CreateCategoryCommand/CreateCategoryLogic";
import CreateCategoryValidator from '../../../Application/CategoryModule/Commands/CreateCategoryCommand/CreateCategoryValidator';
import ValidationException from '../../../Application/Common/Exceptions/ValidationException';

describe('Create Category Validation test', function () {
    
    it('should throw validation Error', function (done) {
        
        let command: CreateCategoryCommand = {
            Name: ""
        };

        try {

            let validation: CreateCategoryValidator = new CreateCategoryValidator(command);
            validation.Validate();

        } catch({message}) {
            expect(message).to.have.string("parameter length should be at least");
        }

        done();

    });
});