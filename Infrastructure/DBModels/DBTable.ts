import Record from "./Record";
import Database from "./Database";

export default class DBTable<T> {

    private readonly TableName: string
    private readonly PrimaryKey: string
    private readonly DB: Database

    constructor(db: Database, name: string, pk = "id") {
        this.TableName = name;
        this.PrimaryKey = pk;
    }

    async Records(): Promise<Record<T>>{
        return await Database.Query<T>(`select * from ${this.TableName}`);
    }

    Add<T>(record: T): boolean {
        //todo: implement add single record method
        throw new Error("not implemented yet!");
    }

    AddRange<T>(records: (Array<T>|Record<T>)): boolean {
        //todo: implement add range of records method
        throw new Error("not implemented yet!");
    }

    Update<T>(record: T): boolean {
        //todo: implement update single record method
        throw new Error("not implemented yet!");
    }

    UpdateRange<T>(records: (Array<T>|Record<T>)): boolean {
        //todo: implement update multiple records method
        throw new Error("not implemented yet!");
    }

    Delete(pk: (number|string)){
        //todo: implement record delete method
        throw new Error("not implemented yet!");
    }

    DeleteRange(pk: Array<number|string>){
        //todo: implement delete multiple records method
        throw new Error("not implemented yet!");
    }

}