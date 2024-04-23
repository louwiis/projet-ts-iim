class LocalStorage {
    constructor(listTasks) {
        this.listTasks = [];
        for (let task of listTasks) {
            this.listTasks.push(task);
        }
    }
    static createTask(task) {
        let tasks = LocalStorage.selectAllTasks();
        tasks.push({
            id: task.id,
            title: task.title,
            description: task.description,
            date: task.date,
            level: task.level,
            categoryId: task.categoryId
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        return task;
    }
    static createCategory(category) {
        let categories = LocalStorage.selectAllCategories();
        categories.push({
            id: category.id,
            title: category.title
        });
        localStorage.setItem('categories', JSON.stringify(categories));
        return category;
    }
    static selectAllTasks() {
        const tasks = localStorage.getItem('tasks');
        if (!tasks) {
            return [];
        }
        return JSON.parse(tasks);
    }
    static selectAllCategories() {
        const categories = localStorage.getItem('categories');
        if (!categories) {
            return [];
        }
        return JSON.parse(categories);
    }
    static deleteTask(taskId) {
        let tasks = LocalStorage.selectAllTasks();
        tasks = tasks.filter(t => t.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    static deleteAllTask() {
        localStorage.removeItem('tasks');
    }
    static updateTask(task) {
        let tasks = LocalStorage.selectAllTasks();
        tasks = tasks.map(t => t.id === task.id ? {
            id: task.id,
            title: task.title,
            description: task.description,
            date: task.date,
            level: task.level,
            categoryId: task.categoryId
        } : {
            id: t.id,
            title: t.title,
            description: t.description,
            date: t.date,
            level: t.level,
            categoryId: t.categoryId
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
export default LocalStorage;
