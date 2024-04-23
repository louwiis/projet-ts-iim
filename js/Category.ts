import ICategory from "./ICategory";
import LocalStorage from "./LocalStorage.js";

class Category implements ICategory{

    private _id:number;
    constructor(private _title:string) {
        this._id = Date.now();
        this._title = _title;
    }

    get id():number {
        return this._id;
    }

    set id(id:number) {
        this._id = id;
    }

    get title():string {
        return this._title;
    }

    createCategory() {
        const newCategory = new Category(this.title);
        LocalStorage.createCategory(newCategory);
    }
}

export default Category;