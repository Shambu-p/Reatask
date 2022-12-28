import ConfigurationService from "../Services/ConfigurationService";
import Database from "./DBModels/Database";
import Authentication from "./Authentication/Authentication";
import AuthenticationInterface from "../Application/Common/Interfaces/AuthenticationInterface";
import DBContext from "./DBModels/DBContext";

export default async function (config: ConfigurationService): Promise<{
    Database: DBContext,
    Authentication: AuthenticationInterface
}> {
    
    return {
        Database: new DBContext(new Database(config.getConfiguration("db"))),
        Authentication: new Authentication()
    }

};