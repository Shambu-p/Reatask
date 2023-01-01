import IIdentity from "./IIdentity";

export default interface AuthenticationInterface {

    Authorize<T>(token: string): void;
    Authenticate<T>(logic: (identity: IIdentity) => Promise<T>): Promise<{
        token: string|null
        state: boolean
    }>;
    Authorization<T>(authLogic?: (loggedUser: T) => Promise<boolean>): Promise<void>;
    GetUser<T>(token: string): T

}