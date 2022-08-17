//Counter for task id number
var taskIdCounter = 0;

// form and task elements
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");

//Create data object when form is submitted
var taskFormHandler = function(event) {
    
    event.preventDefault();
    
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    var taskDataObj = {
        name : taskNameInput,
        type : taskTypeInput
    }
    
    createTaskEl(taskDataObj);
};

//Create element out of task data
var createTaskEl = function(taskDataObj) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //Add task id as a custom attribute for each task element
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);

    taskIdCounter++;
};

var createTaskActions = function(taskId) {

    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id",taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    //drop down status
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name","status-change");
    statusSelectEl.setAttribute("data-task-id",taskId);

    actionContainerEl.appendChild(statusSelectEl);
    
    //Select Options
    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
      
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
      }


    return actionContainerEl;

};

// DELETE and EDIT task functions
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");
    taskSelected.remove();
};

var editTask = function(taskId) {
    console.log("editing tastk "+taskId);
    //task list el
    var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");
    //task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id",taskId);
};

//Task button handler function
var taskButtonHandler = function(event) {
    console.log(event.target);
    if (event.target.matches(".edit-btn")) {

        var taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);

    } else if(event.target.matches(".delete-btn")) {
        //get the task's Id
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};



//set up event to call taskFormHandler
formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);