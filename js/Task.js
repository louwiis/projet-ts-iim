import LocalStorage from "./LocalStorage.js";
class Task {
    constructor(_title, _description, _date, _level, _categoryId) {
        this._title = _title;
        this._description = _description;
        this._date = _date;
        this._level = _level;
        this._categoryId = _categoryId;
        this._id = Date.now();
        this._title = _title;
        this._description = _description;
        this._date = _date;
        this._level = _level;
        this._categoryId = _categoryId;
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
    set title(title) {
        this._title = title;
    }
    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }
    get date() {
        return this._date;
    }
    set date(date) {
        this._date = date;
    }
    get level() {
        return this._level;
    }
    set level(level) {
        this._level = level;
    }
    get categoryId() {
        return this._categoryId;
    }
    set categoryId(categoryId) {
        this._categoryId = categoryId;
    }
    createTask() {
        const newTask = new Task(this.title, this.description, this.date, this.level, this.categoryId);
        LocalStorage.createTask(newTask);
    }
    deleteTask() {
        LocalStorage.deleteTask(this === null || this === void 0 ? void 0 : this.id);
    }
    modifyTask(task) {
        console.log(task);
        LocalStorage.updateTask(task);
    }
}
export default Task;
