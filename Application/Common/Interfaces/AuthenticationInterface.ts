
export default interface AuthenticationInterface {

    LoggedUser<T>(token: string): T
    Authenticate<T>(user: T): {
        token: string|null
        state: boolean
    };
    
    GetUser<T>(token: string): T

}