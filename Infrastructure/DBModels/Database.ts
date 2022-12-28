import DatabaseInterface from "../../Application/Common/Interfaces/DatabaseInterface";
import Records from "./Record";
import mysql from 'mysql';
import DBTable from "./DBTable";
import Category from "../../Domain/Entities/Category";

export default class Database {

    static Connection: any

    static async Query<T>(query: string, param?: Array<any>): Promise<Records<T>> {
        const [results, ] = await Database.Connection.execute(query, param ?? []);
        return new Records<T>(results);
        //todo: implement Database query method
        throw new Error("not implemnted");
    }

    async Connect(configuration: any){
        Database.Connection = await mysql.createConnection(configuration);
        return this;
    }

}