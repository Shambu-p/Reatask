import Database from "./Database";
import Category from "../../Domain/Entities/Category";
import DBTable from "./DBTable";
import IContext from "../../Application/Common/Interfaces/IContext";
import ContextModel from "./ContextModel";

export default class DBContext extends ContextModel implements IContext {

    constructor(db: Database){ super(db); }

    public Categories = this.getTable<Category>("Category");

}