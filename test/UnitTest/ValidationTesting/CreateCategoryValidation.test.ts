import {expect} from 'chai';
import {CreateCategoryCommand} from "../../../Application/CategoryModule/Commands/CreateCategoryCommand/CreateCategoryLogic";
import CreateCategoryValidator from '../../../Application/CategoryModule/Commands/CreateCategoryCommand/CreateCategoryValidator';

describe('Reatask Test', function () {

    describe('sample test', function () {
        it('should return -1 when the value is not present', function (done) {
            
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

});