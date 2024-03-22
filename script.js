
//Create task
function createTask() {
    let inputTask = document.getElementById('inputTask').value;
    //  console.log(inputTask);
    if (inputTask.trim() !== "") {
        let taskList = JSON.parse(localStorage.getItem("Tasks")) || [];
        // console.log("Tasklist" ,taskList );
        let newTask = { id: Date.now(), content: inputTask, completed: false };
        // console.log("New Task : ",newTask);
        taskList.push(newTask);
        localStorage.setItem("Tasks", JSON.stringify(taskList));
        // console.log("Tasklist" ,taskList );
        displayTask();
        document.getElementById("inputTask").value = "";
    }
}

//Display Task
function displayTask() {

    let taskList = JSON.parse(localStorage.getItem("Tasks")) || [];
    let totalTask = document.getElementById("totalTasks");
    totalTask.textContent = `Total tasks : ${taskList.length}`;
    let listContainer = document.getElementById('taskList');
    listContainer.innerHTML = "";

    taskList.forEach(task => {
        let item = document.createElement('div');
        item.innerHTML = `
        <div class="oneTaskDiv">
            <div class="contentDiv">
                <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleCompletion(${task.id})">
                <span class="taskContent"> ${task.content.charAt(0).toUpperCase() + task.content.slice(1)}</span>
            </div>
        
            <div class="operateBtn">
                <button onclick="editTask(${task.id})" class="edit">Edit</button>
                <button onclick="deleteTask(${task.id})" class="delete">Delete</button>
            </div>
        </div>`;

        listContainer.appendChild(item);

    });
}

//Toggle Comp
function toggleCompletion(id) {

    let taskList = JSON.parse(localStorage.getItem("Tasks")) || [];
    let index = taskList.findIndex(task => task.id === id);
    if (index !== -1) {
        taskList[index].completed = !taskList[index].completed;
        localStorage.setItem("Tasks", JSON.stringify(taskList));
        // console.log(taskList);
        displayTask();
    }

}

//Edit Task
function editTask(id) {

    let taskList = JSON.parse(localStorage.getItem("Tasks")) || [];
    let index = taskList.findIndex(task => task.id === id);
    if (index !== -1) {
        var newContent = prompt("Enter new content for the task:", taskList[index].content);
        if (newContent !== null) {
            taskList[index].content = newContent.charAt(0).toUpperCase() + newContent.slice(1);
            localStorage.setItem("Tasks", JSON.stringify(taskList));
            displayTask();
        }
    }
}

//Delete Task
function deleteTask(id) {

    let taskList = JSON.parse(localStorage.getItem("Tasks")) || [];
    let index = taskList.findIndex(task => task.id === id);
    if (index !== -1) {
        taskList.splice(index, 1);
        localStorage.setItem("Tasks", JSON.stringify(taskList));
        displayTask();
        // console.log("After deletion task list:", taskList);
    }
}


window.onload = displayTask;