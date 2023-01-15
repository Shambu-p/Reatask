
import ConfigurationService from "../Services/ConfigurationService";
import DBContext from "../Infrastructure/DBModels/DBContext";
import Authentication from "../Infrastructure/Authentication/Authentication";
import Identity from "../Infrastructure/Authentication/Identity";
import InfrastructureLibrary from "../Infrastructure/InfrastructureLibrary";
import ApplicationLibrary from "../Application/ApplicationLibrary";

export default class TestSetup {

    public static configurationService: ConfigurationService;
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
        TestSetup.configurationService = (TestSetup.configurationService ?? new ConfigurationService("./configuration.json"));


        // initiating infrastructures
        let infrastructure = InfrastructureLibrary(TestSetup.configurationService);

        // singleton initiation of Database infrastructure
        TestSetup.DatabaseInfrastructure = (TestSetup.DatabaseInfrastructure ?? infrastructure.Database);
        
        // singleton initiation of Authentication infrastructure
        TestSetup.AuthenticationInfrastructure = (TestSetup.AuthenticationInfrastructure ?? infrastructure.Authentication);

        // singleton initiation of Identity infrastructure
        TestSetup.IdentityInfrastructure = (TestSetup.IdentityInfrastructure ?? infrastructure.Identity);


        //initiating main application logic
        TestSetup.Application = ( TestSetup.Application ?? ApplicationLibrary(infrastructure.Database, infrastructure.Authentication));

    }

}