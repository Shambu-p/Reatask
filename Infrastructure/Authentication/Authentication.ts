import AuthenticationInterface from "../../Application/Common/Interfaces/AuthenticationInterface";
import DBContext from "../DBModels/DBContext";
import DBTable from "../DBModels/DBTable";
import Identity from "./Identity";
const jwt = require("jsonwebtoken");

export default class Authentication implements AuthenticationInterface {

    private static User: any | null = null;
    private readonly SecretKey: string
    public readonly TokenName: string
    private readonly Expiration: number
    private readonly Identity: Identity

    constructor(configuration: any, identity: Identity) {
        this.SecretKey = configuration.secret_key;
        this.TokenName = configuration.token_name;
        this.Expiration = configuration.expire_after;
        this.Identity = identity;
    }

    Authorize<T>(token: string): void {
        Authentication.User = jwt.verify(token, this.SecretKey);
    }

    async Authenticate<T>(loginLogic: (identity: Identity) => Promise<T> ): Promise<{ token: string | null; state: boolean; }> {

        let user: any = new Object(await loginLogic(this.Identity));

        if(!user[this.Identity.IdentifierName] && user[this.Identity.IdentifierName] == null){
            throw new Error(`Identifier named ${this.Identity.IdentifierName} was not found or it is null in the object to be authenticated`);
        }

        const token = jwt.sign({ ...user, _id: user[this.Identity.IdentifierName]}, this.SecretKey, {
            expiresIn: `${this.Expiration}hr`,
        });

        throw new Error("Method not implemented.");

    }

    GetUser<T>(token: string): T {
        return Authentication.User;
    }

    async Authorization<T>(authLogic?: (loggedUser: T) => Promise<boolean>): Promise<void> {
        if(authLogic){
            if(!await authLogic(Authentication.User)){
                throw new Error("Authorization failed!");
            }
        }
    }

    getToken(){
        return jwt.sign(
            {
                data: 'foobar'
            },
            'secret',
            { expiresIn: '1h' }
        );
    }

    verify<T>(token: string): T {
        let decoded = jwt.verify(token, this.SecretKey);
        return decoded;
    }

}