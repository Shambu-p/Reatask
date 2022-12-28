import Category from "../../../Domain/Entities/Category";
import IDBTable from "./IDBTable";

export default interface IContext {
    Categories: IDBTable<Category>
}