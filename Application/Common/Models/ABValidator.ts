
export default class ABValidator {

    private Message: Array<string>;
    private readonly Property: any
    private readonly Parameter: string
    Result = true;

    constructor(value: string, property: any) {
        this.Property = property;
        this.Parameter = value;
    }

    MaxLength(value: number): this {

        if(this.Property.length > value){
            this.Result = false;
            this.Message.push(`${this.Parameter} length should be less than or equal to ${value}`);
        }

        return this;

    }

    MinLength(value: number): this {

        if(this.Property.length < value){
            this.Result = false;
            this.Message.push(`${this.Message} parameter length should be at least ${value} `);
        }

        return this

    }

    async Must(callback: (property: any) => boolean): Promise<this> {

        let res: boolean = await callback(this.Property);
        if(!res){
            this.Result = false;
        }
        return this;

    }

    getMessage(): string {
        return this.Message.join(", ");
    }


    required(): this {

        if(this.Property == null || !this.Property){
            this.Result = false;
            this.Message.push(`parameter ${this.Parameter} is required!`);
        }
        return this;

    }

    validEmail(): this {
        return this;
    }

}