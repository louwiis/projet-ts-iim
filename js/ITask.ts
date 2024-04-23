import ICategory from "./ICategory";

interface ITask {
    id: number;
    title: string;
    description: string;
    date: string;
    level: string;
    categoryId: number;

    createTask():void;
    deleteTask():void;
    modifyTask(task: ITask):void;
}

export default ITask;