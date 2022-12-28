
export default interface AuthenticationInterface {

    LoggedUser<T>(token: string): T
    Authenticate<T>(user: T): boolean
    CheckAuthorization<T>(callback: (user: T) => boolean): boolean

}