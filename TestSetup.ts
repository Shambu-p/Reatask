
import ConfigurationService from "./Services/ConfigurationService";
import DBContext from "./Infrastructure/DBModels/DBContext";
import Authentication from "./Infrastructure/Authentication/Authentication";
import Identity from "./Infrastructure/Authentication/Identity";
import InfrastructureLibrary from "./Infrastructure/InfrastructureLibrary";
import ApplicationLibrary from "./Application/ApplicationLibrary";

class TestSetup {

    public static DatabaseInfrastructure: DBContext;
    public static AuthenticationInfrastructure: Authentication;
    public static IdentityInfrastructure: Identity;
    public static Application: any = null;

    /**
     * this method will setup 
     * configuration service,
     * Database Infrastructure,
     * Authentication Infrastructure,
     * Identity Infrastructure
     * 
     * to be used in testing.
     */
    public static Setup(): void {
        
        // singleton initiation of configuration infrastructure
        let config: ConfigurationService = new ConfigurationService("/mnt/4CFA61D3FA61B9BA/projects/RetaskBackend/configuration.json");


        // initiating infrastructures
        let infrastructure = InfrastructureLibrary(config);

        // singleton initiation of Database infrastructure
        if(!TestSetup.DatabaseInfrastructure){
            TestSetup.DatabaseInfrastructure = infrastructure.Database;
        }
        
        // singleton initiation of Authentication infrastructure
        if(!TestSetup.AuthenticationInfrastructure){
            TestSetup.AuthenticationInfrastructure = infrastructure.Authentication;
        }

        // singleton initiation of Identity infrastructure
        if(!TestSetup.IdentityInfrastructure){
            TestSetup.IdentityInfrastructure = infrastructure.Identity;
        }


        //initiating main application logic
        if(!TestSetup.Application){
            TestSetup.Application = ApplicationLibrary(infrastructure.Database, infrastructure.Authentication);
        }

    }

}

export default TestSetup;