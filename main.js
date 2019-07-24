let button = document.querySelector('.task-icon');
let task = document.querySelector('.task-input');
let list = document.querySelector('.task-list');
let Id = document.querySelector('.id')
let taskList = getData() || [];
showTasks();

button.addEventListener('click', check);

function check() {
    if (Id.value.length) {
        editTask()
    }
    else {
        addTask();
    }
}


function addTask() {
    let value = task.value;
    if (value) {
        taskList.push({ task: value, completed: false });
        clear();
        saveData(taskList);
        showTasks()
    }
    else {
        alert('please type a title')
    }
}

function editTask() {
    let value = task.value;
    let id = Id.value;

    taskList[id].task = value;

    showTasks();
    saveData(taskList);
    clear();
}

function remove(index) {
    taskList.splice(index, 1);
    showTasks();
    saveData(taskList);
}

function toggle(index) {
    let task = taskList[index];
    task.completed = !task.completed;
    showTasks();
    saveData(taskList)
}

function show(index) {
    task.value = taskList[index].task;
    Id.value = index;
}
function clear() {
    task.value = "";
    Id.value = "";
}
function showTasks() {
    let task = "";
    taskList.forEach((item, index) => {
        let completedValue = item.completed ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-times-circle"></i>';
        task += `
        <li>
        ${item.task}
        <span class="task-icons">
        <button onclick="remove(${index})"><i class="fas fa-trash-alt"></i></button>
        <button onclick="toggle(${index})"> ${completedValue} </button>
        <button onclick="show(${index})"><i class="fas fa-edit"></i></button>
        </span>
        </li>
        `
    })
    list.innerHTML = task
}



function saveData(array) {
    localStorage.setItem('tasks', JSON.stringify(array));
}
function getData() {
    let tasks = localStorage.getItem('tasks');
    return JSON.parse(tasks);
}