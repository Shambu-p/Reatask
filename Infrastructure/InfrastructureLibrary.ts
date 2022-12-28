import ConfigurationService from "../Services/ConfigurationService";
import Database from "./DBModels/Database";
import Authentication from "./Authentication/Authentication";
import DatabaseInterface from "../Application/Common/Interfaces/DatabaseInterface";
import AuthenticationInterface from "../Application/Common/Interfaces/AuthenticationInterface";

export default async function (config: ConfigurationService): Promise<{
    Database: DatabaseInterface,
    Authentication: AuthenticationInterface
}> {

    let connection: Database = new Database();
    try{
        await connection.Connect(config.getConfiguration("db"))
    }catch (error) {
        throw new Error(`Database connection failed ${error.message}`)
    }

    return {
        Database: connection,
        Authentication: new Authentication()
    }

};