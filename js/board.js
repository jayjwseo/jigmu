// Modules
import { renderTaskCard, renderAddNewTaskCard } from "./boardRender.js";
import TaskManager from "./taskManager.js";
//Select modal form user input fields
// const newTaskModal = document.querySelector("#new-task-modal");
const newTaskForm = document.querySelector("#new-task-form");
const newTitleInput = document.querySelector("#new-task-title");
const newDescInput = document.querySelector("#new-task-desc");
const newMemberInput = document.querySelector("#new-task-member");
const newDateInput = document.querySelector("#new-task-date");
const newTagInput = document.querySelector("#new-task-tag");
const newStatusInput = document.querySelector("#new-task-status");
//Select modal form messages
const errorFields = document.querySelector("#error-fields");
const errorDate = document.querySelector("#error-date");
// const successUpdate = document.querySelector("#success-update");
//Select elements for modal form reset
const newTaskModalClose = document.querySelectorAll(".new-task-modal-close");
const newTaskFormMessages = document.querySelectorAll(".new-task-form-message");
//Select all list canvas
const listCanvas = document.querySelectorAll(".list-canvas");
//Select all add task button
const addTask = document.querySelector(".add-task");
//Select all task card canvas
const taskCardCanvas = document.querySelectorAll(".task-card-canvas");
// Local Storage Keys
const LOCAL_STORAGE_PREFIX = "JKBOARD_BOARD_CANVAS";
const TASK_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-TASK`;
// Task Card Set One Array & Render/Load
let taskCardsSetOne = loadCanvas();
taskCardsSetOne.forEach(renderTaskCard);

//Task card status update & re-locate
taskCardCanvas.forEach((canvas) => {
  canvas.addEventListener("click", (e) => {
    if (!e.target.matches("[data-status-change]")) return;
    const taskCard = e.target.closest(".task-card");
    const taskId = taskCard.dataset.taskCardId;
    //Look for the task in the array using the id
    const task = taskCardsSetOne.find((t) => t.id === taskId);
    //Update the status of the referenced task
    task.status = e.target.innerText;
    //Remove task card from the previous location(list)
    taskCard.remove();
    //Render task card to the new location(list)
    renderTaskCard(task);
    saveCanvas();
  });
});

addTask.addEventListener("click", () => {
  renderAddNewTaskCard();
});

newTaskForm.addEventListener("submit", (e) => {
  //Prevent default refresh
  e.preventDefault();

  //User input values
  const taskTitle = newTitleInput.value;
  const taskDesc = newDescInput.value;
  const taskMember = newMemberInput.value;
  const taskTag = newTagInput.value;
  const taskStatus = newStatusInput.value;
  const taskDate = newDateInput.value;
  const userDate = new Date(taskDate);
  // Check due date input is not in the past
  const dateValid = userDate > dateValidRef() ? true : false;

  // Let A = taskTitle, B = taskDate, C = DateValid
  // 0 0 0	0
  // 0 0 1	0
  // 0 1 0	0
  // 0 1 1	0
  // 1 0 0	1
  // 1 0 1	1
  // 1 1 0	0
  // 1 1 1	1
  // y = AB' + AC
  if ((taskTitle && !taskDate) || (taskTitle && dateValid)) {
    updateTaskCard(
      taskTitle,
      taskDesc,
      taskMember,
      taskDate,
      taskTag,
      taskStatus
    );
  } else if (!taskTitle) {
    // successUpdate.classList.add("d-none");
    errorDate.classList.add("d-none");
    errorFields.classList.remove("d-none");
  } else {
    // successUpdate.classList.add("d-none");
    errorDate.classList.remove("d-none");
    errorFields.classList.add("d-none");
  }
});

// Reset form on close
newTaskModalClose.forEach((btn) => {
  btn.addEventListener("click", () => {
    newTaskForm.reset();
    clearMessages(newTaskFormMessages);
  });
});

// Clear form messages
function clearMessages(messages) {
  messages.forEach((msg) => {
    msg.classList.add("d-none");
  });
}

// Date validation reference generator
function dateValidRef() {
  //today w/o timestamp
  const y = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  //today minus 1 millisecond
  const ref = new Date(y.setMilliseconds(y.getMilliseconds() - 1));
  return ref;
}

//Get saved data as an array
function loadCanvas() {
  const taskCardsSetOneString = localStorage.getItem(TASK_STORAGE_KEY);
  //Empty array if data not present
  return JSON.parse(taskCardsSetOneString) || [];
}

//Save on local storage
function saveCanvas() {
  localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(taskCardsSetOne));
}

//Update Task Card
function updateTaskCard(title, desc, member, date, tag, status) {
  const newTaskCard = new TaskManager(title, desc, member, date, tag, status);
  //Push new task card to array
  taskCardsSetOne.push(newTaskCard);
  //Render new task card
  renderTaskCard(newTaskCard);
  //Save to local storage
  saveCanvas();
  // successUpdate.classList.remove("d-none");
  errorFields.classList.add("d-none");
  errorDate.classList.add("d-none");
  //Modal reset & close
  newTaskForm.reset();
  clearMessages(newTaskFormMessages);
  $("#new-task-modal").modal("hide");
}
