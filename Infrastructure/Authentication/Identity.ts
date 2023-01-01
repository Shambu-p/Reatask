import DBTable from "../DBModels/DBTable";
import Database from "../DBModels/Database";
import bcrypt from 'bcrypt';

const jwt = require("jsonwebtoken");


export default class Identity {

    private readonly HashedProperties: Array<string>
    public readonly IdentifierName: string
    private readonly TableName: string
    private readonly DbConnection: Database
    private readonly SaltRounds = 8;

    constructor(configuration: any, connection: Database) {

        if(!configuration.id || configuration.id == null) {
            throw new Error("identifier 'id' is not set in configuration file under 'Identity' segment");
        } else if(!configuration.hashed_properties || configuration.id == null) {
            throw new Error("identifier 'hashed_properties' is not set in configuration file under 'Identity' segment");
        } else if(!configuration.table || configuration.table == null) {
            throw new Error("identifier 'table' is not set in configuration file under 'Identity' segment");
        }

        this.HashedProperties = configuration.hashed_properties;
        this.IdentifierName = configuration.id;
        this.TableName = configuration.table
        this.DbConnection = connection;

    }

    getCollection<R>(): DBTable<R> {
        return new DBTable<R>(this.DbConnection, this.TableName, this.IdentifierName);
    }

    private async dataCleaner(obj: any): Promise<any>{

        let entries = Object.entries(obj);

        //search for all the properties declared as encrypted values
        //and change their value to encrypted value
        entries.forEach(async ([prop, value]: [string, any]) => {
            if(this.HashedProperties.indexOf(prop) >= 0){
                //encrypt the value and set it back
                obj[prop] = await bcrypt.hash(value, this.SaltRounds);
            }
        });

        return obj;

    }

    async Update<T>(user: T): Promise<boolean> {

        let dbTable = this.getCollection<T>();
        let cleanedData = this.dataCleaner(new Object(user))
        return await dbTable.Update(await cleanedData);

    }

    async Create<T>(user: T): Promise<boolean> {

        let dbTable = this.getCollection<T>();
        let cleanedData = this.dataCleaner(new Object(user));
        return await dbTable.Add(await cleanedData);

    }

    async Remove<T>(id: string | number): Promise<boolean> {

        let dbTable = this.getCollection<T>();
        return await dbTable.Delete(id);

    }

    verifyHashed(hashValue: string, value: string): boolean {
        return bcrypt.compareSync(value, hashValue);
    }

}