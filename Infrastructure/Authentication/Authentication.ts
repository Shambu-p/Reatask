import AuthenticationInterface from "../../Application/Common/Interfaces/AuthenticationInterface";

export default class Authentication implements AuthenticationInterface {

    public static User: string | null = null; 

    LoggedUser<T>(token: string): T {
        throw new Error("Method not implemented.");
    }
    Authenticate<T>(user: T): { token: string | null; state: boolean; } {
        throw new Error("Method not implemented.");
    }
    GetUser<T>(token: string): T {
        throw new Error("Method not implemented.");
    }

}