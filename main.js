let submitTaskSelector = document.querySelector('.task-icon');
let taskInputSelector = document.querySelector('.task-input');
let taskListSelector = document.querySelector('.task-list');
let taskId = document.querySelector('.id')
let taskList = getData() || [];
showTasks();

submitTaskSelector.addEventListener('click', check);

function check() {
    if (taskId.value.length) {
        editTask()
    }
    else {
        addTask();
    }
}


function addTask() {
    let value = taskInputSelector.value;
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
    let value = taskInputSelector.value;
    let id = taskId.value;

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
    taskInputSelector.value = taskList[index].task;
    taskId.value = index;
}
function clear() {
    taskInputSelector.value = "";
    taskId.value = "";
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
    taskListSelector.innerHTML = task
}



function saveData(array) {
    localStorage.setItem('tasks', JSON.stringify(array));
}
function getData() {
    let tasks = localStorage.getItem('tasks');
    return JSON.parse(tasks);
}