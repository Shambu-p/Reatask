import Records from "./Record";
const mysql = require('mysql2');
// import Connection from "mysql2/typings/mysql/lib/Connection";

export default class Database {

    public Connection: any = null;
    private readonly Configuration: any = null;

    constructor(configuration: any){
        this.Configuration = configuration;
    }

    async Query<T>(query: string, param?: Array<any>): Promise<Records<T>> {

        await this.Connect();
        const [results, ] = await this.Connection.execute(query, param ?? []);
        return new Records<T>(results);

    }

    private async Connect(){
        
        if(!this.Connection){
            this.Connection = await mysql.createConnection(this.Configuration);
        }

    }

}