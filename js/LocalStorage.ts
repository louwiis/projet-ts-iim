import Task from "./Task";
import Category from "./Category";

class LocalStorage {

    listTasks:Task[];

    constructor(listTasks:Task[]) {
        this.listTasks = [];

        for (let task of listTasks) {
            this.listTasks.push(task);
        }
    }

    public static createTask(task:Task):Task {
        let tasks = LocalStorage.selectAllTasks();
        tasks.push({
            id: task.id,
            title: task.title,
            description: task.description,
            date: task.date,
            level: task.level,
            categoryId: task.categoryId
        } as Task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        return task;
    }

    public static createCategory(category:Category):Category {
        let categories = LocalStorage.selectAllCategories();
        categories.push({
            id: category.id,
            title: category.title
        } as Category);
        localStorage.setItem('categories', JSON.stringify(categories));

        return category;
    }

    public static selectAllTasks():Task[] {
        const tasks = localStorage.getItem('tasks');

        if (!tasks) {
            return [];
        }

        return JSON.parse(tasks);
    }

    public static selectAllCategories():Category[] {
        const categories = localStorage.getItem('categories');

        if (!categories) {
            return [];
        }

        return JSON.parse(categories);
    }

    public static deleteTask(taskId: number):void {
        let tasks = LocalStorage.selectAllTasks();
        tasks = tasks.filter(t => t.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    public static deleteAllTask():void {
        localStorage.removeItem('tasks');
    }

    public static updateTask(task:Task):void {
        let tasks = LocalStorage.selectAllTasks();
        tasks = tasks.map(t => t.id === task.id ? {
            id: task.id,
            title: task.title,
            description: task.description,
            date: task.date,
            level: task.level,
            categoryId: task.categoryId
        } as Task : {
            id: t.id,
            title: t.title,
            description: t.description,
            date: t.date,
            level: t.level,
            categoryId: t.categoryId
        } as Task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
 
}

export default LocalStorage;