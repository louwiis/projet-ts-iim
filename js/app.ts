
/// CRUD

import Category from "./Category.js";
import Task from "./Task.js";
import LocalStorage from "./LocalStorage.js";

function addOptionCategory(category: Category) {
    const selectCategory = document.getElementById('taskCategory') as HTMLSelectElement;
    selectCategory.innerHTML += `<option value="${category.id}">${category.title}</option>`;

    const selectCategoryEdit = document.getElementById('filterCategory') as HTMLSelectElement;
    selectCategoryEdit.innerHTML += `<option value="${category.id}">${category.title}</option>`;
}

function createDivTask(task: Task) { 
    const htmlTasks = document.getElementById('tasks') as HTMLDivElement;

    htmlTasks.innerHTML += `
        <div class="task ${task.level}" data-id="${task.id}">
            <h3>${task.title} <span>– Priorité ${task.level}</span></h3>
            <p>Date d'échéance: ${task.date}</p>
            <p>${task.description}</p>
            <p>Catégorie: ${categories.find(category => category.id === task.categoryId)?.title}</p>
            <button class="delete-btn" data-id="${task.id}">Supprimer</button>
            <button class="edit-btn" data-id="${task.id}">Modifier</button>
        </div>
    `
}

function saveTask(task: Task) {
    const taskDiv = document.querySelector(`div.task[data-id="${task.id}"]`) as HTMLDivElement;

    const title = (document.getElementById('editTaskTitle') as HTMLInputElement).value;
    const description = (document.getElementById('editTaskDescription') as HTMLInputElement).value;
    const date = (document.getElementById('editTaskDueDate') as HTMLInputElement).value;
    const level = (document.getElementById('editTaskPriority') as HTMLSelectElement).value;
    const categoryId = (document.getElementById('editTaskCategory') as HTMLSelectElement).value;

    task.title = title;
    task.description = description;
    task.date = date;
    task.level = level;
    task.categoryId = parseInt(categoryId);
    
    taskDiv.innerHTML = `
        <h3>${task.title} <span>– Priorité ${task.level}</span></h3>
        <p>Date d'échéance: ${task.date}</p>
        <p>${task.description}</p>
        <p>Catégorie: ${categories.find(category => category.id === task.categoryId)?.title}</p>
        <button class="delete-btn" data-id="${task.id}">Supprimer</button>
        <button class="edit-btn" data-id="${task.id}">Modifier</button>
    `;

    taskDiv.classList.remove('high', 'medium', 'low');
    taskDiv.classList.add(task.level);

    task.modifyTask(task);

    addEventListenerOnDeleteBtn();
    addEventListenerOnEditBtn();
}

function addEventListenerOnEditBtn() {
    const editBtns = document.querySelectorAll('button.edit-btn') as NodeListOf<HTMLButtonElement>;
    editBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const taskId = parseInt((e.target as HTMLButtonElement).dataset.id as string);
            const task = tasks.find(task => task.id === taskId) as Task;
            
            const taskDiv = document.querySelector(`div.task[data-id="${task.id}"]`) as HTMLDivElement;

            taskDiv.innerHTML = `
                <form id="editTaskForm">
                    <input type="text" id="editTaskTitle" value="${task.title}">
                    <input type="text" id="editTaskDescription" value="${task.description}">
                    <input type="date" id="editTaskDueDate" value="${task.date}">
                    <select id="editTaskPriority">
                        <option value="high" ${task.level === 'high' ? 'selected' : ''}>Haute</option>
                        <option value="medium" ${task.level === 'medium' ? 'selected' : ''}>Moyenne</option>
                        <option value="low" ${task.level === 'low' ? 'selected' : ''}>Basse</option>
                    </select>
                    <select id="editTaskCategory">
                        ${categories.map(category => `<option value="${category.id}" ${category.id === task.categoryId ? 'selected' : ''}>${category.title}</option>`).join('')}
                    </select>
                    <button class="save-btn" data-id="${task.id}">Sauvegarder</button>
                </form>
            `;

            const saveBtn = document.querySelector('button.save-btn') as HTMLButtonElement;
            saveBtn.addEventListener('click', () => {
                saveTask(task);
            });
        });
    });
}

function addEventListenerOnDeleteBtn() {
    const deleteBtns = document.querySelectorAll('button.delete-btn') as NodeListOf<HTMLButtonElement>;
    deleteBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const taskId = parseInt((e.target as HTMLButtonElement).dataset.id as string);
            const task = tasks.find(task => task.id === taskId) as Task;

            task.deleteTask();
            (e.target as HTMLButtonElement).parentElement?.remove();
        });
    });
}

// ON PAGE LOAD RÉCUPÉRER TOUTES LES TACHES ET CATEGORIES DANS LE LOCALSTORAGE
const localTasks = LocalStorage.selectAllTasks() as Task[];
const tasks = localTasks.map(task => {
    const t = new Task(task.title, task.description, task.date, task.level, task.categoryId);
    t.id = task.id;

    return t;
})
const localCategories = LocalStorage.selectAllCategories() as Category[];
const categories = localCategories.map(category => {
    const c = new Category(category.title);
    c.id = category.id;

    return c;
});

// AJOUTER LES TACHES ET CATEGORIES DANS LE DOM
for (let task of tasks) {
    createDivTask(task);
}

for (let category of localCategories) {
    addOptionCategory(category);
}

// CAPTER L'ÉVÉNEMENT AJOUTER UNE CATEGORIE
const createCategoryForm = document.getElementById('categoryForm') as HTMLFormElement;
createCategoryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = (document.getElementById('categoryTitle') as HTMLInputElement);
    const newCategory = new Category(title.value);
    categories.push(newCategory);
    newCategory.createCategory();
    addOptionCategory(newCategory);

    title.value = '';

    addEventListenerOnDeleteBtn();
    addEventListenerOnEditBtn();
});

// CAPTER L'ÉVÉNEMENT AJOUTER UNE TACHE
const createTaskForm = document.getElementById('taskForm') as HTMLFormElement;
createTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = (document.getElementById('taskTitle') as HTMLInputElement);
    const description = (document.getElementById('taskDescription') as HTMLInputElement);
    const date = (document.getElementById('taskDueDate') as HTMLInputElement);
    const level = (document.getElementById('taskPriority') as HTMLSelectElement);
    const category = (document.getElementById('taskCategory') as HTMLSelectElement);

    const newTask = new Task(title.value, description.value, date.value, level.value, parseInt(category.value));
    tasks.push(newTask);
    newTask.createTask();
    createDivTask(newTask);

    title.value = '';
    description.value = '';
    date.value = '';
    level.value = 'high';

    addEventListenerOnDeleteBtn();
    addEventListenerOnEditBtn();
});

// CAPTER L'ÉVENEMENT JE MODIFIE UNE TACHE
addEventListenerOnEditBtn();

// CAPTER L'ÉVÉNEMENT JE SUPPRIME UNE TACHE
addEventListenerOnDeleteBtn();

// J'APPLIQUE UN FILTRE
const filterForm = document.getElementById('filterForm') as HTMLFormElement;

filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const priority = (document.getElementById('filterPriority') as HTMLSelectElement).value;
    const date = (document.getElementById('filterDate') as HTMLInputElement).value;
    const category = (document.getElementById('filterCategory') as HTMLSelectElement).value;

    const filteredTasks = tasks.filter(task => {
        if (priority !== 'all' && task.level !== priority) {
            return false;
        }

        if (date !== '' && task.date !== date) {
            return false;
        }

        if (category !== 'all' && task.categoryId !== parseInt(category)) {
            return false;
        }

        return true;
    });
    
    const htmlTasks = document.getElementById('tasks') as HTMLDivElement;
    htmlTasks.innerHTML = '';

    for (let task of filteredTasks) {
        createDivTask(task);
    }

    addEventListenerOnDeleteBtn();
    addEventListenerOnEditBtn();
});


// JE FAIS UNE RECHERCHE
const searchForm = document.getElementById('searchForm') as HTMLFormElement;
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const search = (document.getElementById('searchInput') as HTMLInputElement).value;
    const filteredTasks = tasks.filter(task => task.title.includes(search));
    
    const htmlTasks = document.getElementById('tasks') as HTMLDivElement;
    htmlTasks.innerHTML = '';

    for (let task of filteredTasks) {
        createDivTask(task);
    }

    addEventListenerOnDeleteBtn();
    addEventListenerOnEditBtn();
});