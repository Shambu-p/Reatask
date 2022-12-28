import Record from "./Record";
import Database from "./Database";
import IDBTable from "../../Application/Common/Interfaces/IDBTable";

export default class DBTable<T> implements IDBTable<T> {

    private readonly TableName: string
    private readonly PrimaryKey: string
    private readonly DB: Database

    constructor(db: Database, name: string, pk = "id") {
        this.TableName = name;
        this.PrimaryKey = pk;
        this.DB = db;
    }

    async Records(): Promise<Record<T>>{
        return await this.DB.Query<T>(`select * from ${this.TableName}`);
    }

    async Add<T>(record: (T|Array<T>)): Promise<boolean> {

        if(Array.isArray(record)){
            return this.AddRange(record);
        }

        let obj = new Object(record);

        let res = this.getAddSingleQuery(obj);
        
        let query = `insert into ${this.TableName} (${Object.keys(obj).join(", ")}) values ${res.valuesQuery}`;
        await this.DB.Query(query, res.values);
        
        return true;

    }

    private getAddSingleQuery(obj: any, index = 0): {
        values: Array<[string, any]>,
        valuesQuery: string
    } {
        
        let placehoders: Array<string> = [];
        let parameters: Array<[string, any]> = [];
        
        Object.entries(obj).forEach(([key, value]) => {
            placehoders.push(`@column${index}_${key}`);
            parameters.push([`@column${index}_${key}`, value]);
        });

        return {
            values: parameters,
            valuesQuery: `(${placehoders.join(", ")})`
        };

    }

    private async AddRange<T>(records: Array<T>): Promise<boolean> {

        let valuesQuery: Array<string> = [];
        let values = new Map<string, any>();
        let columns: Array<string> = [];

        records.forEach((rec, index) => {
            
            let obj = new Object(rec);
            if(columns.length == 0){
                columns = Object.keys(obj);
            }

            let res = this.getAddSingleQuery(obj);
            valuesQuery.push(res.valuesQuery);
            res.values.forEach(([k, v]) => {
                if(!values.has(k)){
                    values.set(k, v)
                }
            });
            
        });
        
        
        let query = `insert into ${this.TableName} (${columns.join(", ")}) values ${valuesQuery.join(", ")};`;

        await this.DB.Query(query, Array.from(values));
        return true;
        
    }

    Update<T>(record: T): Promise<boolean> {
        //todo: implement update single record method
        throw new Error("not implemented yet!");
    }

    UpdateRange<T>(records: (Array<T>|T)): boolean {
        //todo: implement update multiple records method
        throw new Error("not implemented yet!");
    }

    Delete(pk: (number|string)): Promise<boolean> {
        //todo: implement record delete method
        throw new Error("not implemented yet!");
    }

    DeleteRange(pk: Array<number|string>){
        //todo: implement delete multiple records method
        throw new Error("not implemented yet!");
    }

}