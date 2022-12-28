import RecordsInterface from "./RecordsInterface";

export default interface IDBTable<T> {

    Records(): Promise<RecordsInterface<T>>;
    Add<T>(record: (T|Array<T>)): Promise<boolean>;
    Update<T>(record: (T|Array<T>)): Promise<boolean>;
    Delete<T>(pk: ((number|string)|Array<(number|string)>)): Promise<boolean>;

}