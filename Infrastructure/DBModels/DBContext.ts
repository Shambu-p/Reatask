import Database from "./Database";
import Category from "../../Domain/Entities/Category";

export default class DBContext {

    public Categories = DBTable<Category>("Category");

}