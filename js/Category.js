import LocalStorage from "./LocalStorage.js";
class Category {
    constructor(_title) {
        this._title = _title;
        this._id = Date.now();
        this._title = _title;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get title() {
        return this._title;
    }
    createCategory() {
        const newCategory = new Category(this.title);
        LocalStorage.createCategory(newCategory);
    }
}
export default Category;
