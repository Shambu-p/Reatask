import DBTable from "./DBTable";
import Database from "./Database";

export default class ContextModel {

    private readonly Database: Database

    constructor(db: Database){
        this.Database = db;
    }

    public getTable<T>(name: string, pk = "id"): DBTable<T> {
        return new DBTable<T>(this.Database, name, pk);
    }
}