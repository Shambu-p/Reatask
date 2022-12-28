import AuthenticationInterface from "../../Application/Common/Interfaces/AuthenticationInterface";

export default class Authentication implements AuthenticationInterface {
    Authenticate<T>(user: T): boolean {
        return false;
    }

    CheckAuthorization<T>(callback: (user: T) => boolean): boolean {
        return false;
    }

    LoggedUser<T>(token: string): T {
        return undefined;
    }

}