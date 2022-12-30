import ABValidator from "./ABValidator";

export default class NiceValidation<T> {

    Command: T
    Props: Map<string, any>

    constructor(command: T) {
        this.Command = command;
        this.Props = new Map<string, any>(Object.entries(new Object(command)));
    }

    Rule(propertyName: string, callback: (validator: ABValidator) => ABValidator): void {

        if(!this.Props.has(propertyName)){
            throw new Error(`property named ${propertyName} is not defined!`)
        }

        // console.log(this.Props.get(propertyName));
        // console.log(propertyName);
        let res = callback(new ABValidator(propertyName, this.Props.get(propertyName)));
        if(!res.Result){
            throw new Error(res.getMessage());
        }

    }

    Validate(){}

}