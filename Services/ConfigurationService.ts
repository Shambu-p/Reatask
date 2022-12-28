const fs = require('fs');
// const fs: any = {};

class ConfigurationService {

    private readonly FileAddress: string

    constructor(fileName: string) {
        this.FileAddress = fileName;
    }

    getConfiguration<T>(confName: string): T {

        let configurations = JSON.parse(fs.readFileSync( this.FileAddress , { encoding: 'utf8' }));
        if(configurations[confName] == null){
            throw new Error(`Configuration named ${confName} is not found in configuration file`);
        }

        return configurations[confName];

    }

}

export default ConfigurationService;