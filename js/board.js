// Modules
import TaskManager from "./taskManager.js";

//Select modal form user input fields
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
const successUpdate = document.querySelector("#success-update");
//Select elements for modal form reset
const newTaskModalClose = document.querySelectorAll(".new-task-modal-close");
const newTaskFormMessages = document.querySelectorAll(".new-task-form-message");
//Select all task card canvas
const taskCardCanvas = document.querySelectorAll(".task-card-canvas");
//Select Templates
const taskCardTemplate = document.querySelector("#task-card-template");
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
    successUpdate.classList.add("d-none");
    errorDate.classList.add("d-none");
    errorFields.classList.remove("d-none");
  } else {
    successUpdate.classList.add("d-none");
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

// Render task card
function renderTaskCard(newTaskCard) {
  //Clone Template Content
  const clone = taskCardTemplate.content.cloneNode(true);

  //Select Canvases
  const taskCardCanvasTodo = document.querySelector("#task-card-canvas-todo");
  const taskCardCanvasInprogress = document.querySelector(
    "#task-card-canvas-inprogress"
  );
  const taskCardCanvasReview = document.querySelector(
    "#task-card-canvas-review"
  );
  const taskCardCanvasDone = document.querySelector("#task-card-canvas-done");
  const taskCardCanvasObsolete = document.querySelector(
    "#task-card-canvas-obsolete"
  );

  // Select Elements
  const titleElement = clone.querySelector("[data-task-card-title]");
  const descElement = clone.querySelector("[data-task-card-desc]");
  const memberElement = clone.querySelector("[data-task-card-member]");
  const dateElement = clone.querySelector("[data-task-card-date]");
  const tagElement = clone.querySelector("[data-task-card-tag]");
  const statusElement = clone.querySelector("[data-task-card-status]");

  //Elements Array
  const elements = [
    titleElement,
    descElement,
    memberElement,
    dateElement,
    tagElement,
    statusElement,
  ];

  // Render Elements
  titleElement.innerText = newTaskCard.title;
  //Truncate task description length to 63 characters
  descElement.innerText = newTaskCard.desc.slice(0, 63);
  memberElement.innerText = newTaskCard.member;
  //Use user friendly date format
  dateElement.innerText = newTaskCard.date
    ? friendlyDate(newTaskCard.date)
    : "";
  tagElement.innerText = newTaskCard.tag;
  statusElement.innerText = newTaskCard.status;

  //Hide when no value to display
  elements.forEach((element) => {
    const elementNoValue = element.closest(".task-card-element");
    if (element.innerText === "") {
      elementNoValue.classList.toggle("d-none");
    }
  });

  // Render Dataset ID
  const taskCard = clone.querySelector(".task-card");
  taskCard.dataset.taskCardId = newTaskCard.id;

  // Append Template Clone
  let status = newTaskCard.status;
  switch (status) {
    case "TO DO":
      taskCardCanvasTodo.appendChild(clone);
      break;
    case "IN PROGRESS":
      taskCardCanvasInprogress.appendChild(clone);
      break;
    case "REVIEW":
      taskCardCanvasReview.appendChild(clone);
      break;
    case "DONE":
      taskCardCanvasDone.appendChild(clone);
      break;
    case "OBSOLETE":
      taskCardCanvasObsolete.appendChild(clone);
      break;
    default:
      console.log("Status Unknown");
  }
}

// User friendly date format
function friendlyDate(date) {
  let dateInput = new Date(date);
  let frdlyDate = dateInput.toDateString();
  return frdlyDate;
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
  successUpdate.classList.remove("d-none");
  errorFields.classList.add("d-none");
  errorDate.classList.add("d-none");
  //Form reset
  newTaskForm.reset();
  //Easter egg
  // newTaskCard.askMagicEight();
}
