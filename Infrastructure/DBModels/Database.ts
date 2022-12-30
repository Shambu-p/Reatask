import Records from "./Record";
const mysql = require('mysql2/promise');
// import Connection from "mysql2/typings/mysql/lib/Connection";

export default class Database {

    public Connection: any = null;
    private readonly Configuration: any = null;

    constructor(configuration: any){
        this.Configuration = configuration;
    }

    async Query<T>(query: string, param?: (any)): Promise<Records<T>> {

        await this.Connect();
        this.Connection.config.namedPlaceholders = true;
        const [results, fields] = await this.Connection.execute(query, param ?? {});
        // console.log(fields[0].name);
        return new Records<T>(results);

    }

    private async Connect(){
        
        if(!this.Connection){
            this.Connection = await mysql.createConnection(this.Configuration);
        }

    }

}