import Category from "./Category";
import ITask from "./ITask";
import LocalStorage from "./LocalStorage.js";

class Task implements ITask {
    private _id:number;
    constructor(private _title:string, private _description:string, private _date:string, private _level:string, private _categoryId:number) {
        this._id = Date.now();
        this._title = _title;
        this._description = _description;
        this._date = _date;
        this._level = _level;
        this._categoryId = _categoryId;
    }

    get id():number {
        return this._id as number;
    }

    set id(id:number) {
        this._id = id;
    }

    get title():string {
        return this._title;
    }

    set title(title:string) {
        this._title = title;
    }

    get description():string {
        return this._description;
    }

    set description(description:string) {
        this._description = description;
    }

    get date():string {
        return this._date;
    }

    set date(date:string) {
        this._date = date;
    }

    get level():string {
        return this._level;
    }

    set level(level:string) {
        this._level = level;
    }

    get categoryId(): number {
        return this._categoryId;
    }

    set categoryId(categoryId:number) {
        this._categoryId = categoryId;
    }

    createTask() {
        const newTask = new Task(this.title, this.description, this.date, this.level, this.categoryId);
        LocalStorage.createTask(newTask);
    }

    deleteTask() {
        LocalStorage.deleteTask(this?.id as number);
    }

    modifyTask(task: Task) {
        console.log(task);
        LocalStorage.updateTask(task);
    }
}

export default Task;