// Modules
import TaskManager from "./taskManager.js";

//test
// const body = document.querySelector("body");
// const newTaskModal = document.querySelector("#new-task-modal");

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
const successNew = document.querySelector("#success-new");
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
    //Ignore if not status change button click
    if (!e.target.matches("[data-status-change]")) return;
    //Select the parent task card
    const taskCard = e.target.closest(".task-card");
    //Retrieve task id of the parent task card
    const taskId = taskCard.dataset.taskCardId;
    //Look for the task in the array using the id
    const task = taskCardsSetOne.find((t) => t.id === taskId);
    //Update the status of the referenced task
    task.status = e.target.innerText;
    //Remove task card from the previous location(list)
    taskCard.remove();
    //Render task card to the new location(list)
    renderTaskCard(task);
    //Save to local storage
    saveCanvas();
  });
});

newTaskForm.addEventListener("submit", (e) => {
  //Prevent default refresh
  e.preventDefault();
  //User input values
  const userDate = new Date(newDateInput.value);
  const taskTitle = newTitleInput.value;
  const taskDesc = newDescInput.value;
  const taskMember = newMemberInput.value;
  const taskDate = newDateInput.value;
  const taskTag = newTagInput.value;
  const taskStatus = newStatusInput.value;

  // Check all fields have input
  if (
    taskTitle &&
    taskDesc &&
    taskMember &&
    taskDate &&
    taskTag &&
    taskStatus
  ) {
    // Check due date input is not in the past
    if (userDate > yesterday()) {
      // Add task card (When all input fields are valid)
      const newTaskCard = new TaskManager(
        taskTitle,
        taskDesc,
        taskMember,
        taskDate,
        taskTag,
        taskStatus
      );
      //Push new task card to array
      taskCardsSetOne.push(newTaskCard);
      //Render new task card
      renderTaskCard(newTaskCard);
      //Save to local storage
      saveCanvas();
      successNew.classList.remove("d-none");
      errorDate.classList.add("d-none");
      //Form reset
      newTaskForm.reset();
      //Easter egg
      newTaskCard.askMagicEight();
    } else {
      errorDate.classList.remove("d-none");
      successNew.classList.add("d-none");
    }
    errorFields.classList.add("d-none");
  } else {
    errorFields.classList.remove("d-none");
    successNew.classList.add("d-none");
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

// Date value (yesterday) generator for date input validation
function yesterday() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
}

// // Task card constructor (***MOVED TO taskManager.js***)
// class TaskCard {
//   constructor(title, desc, member, date, tag, status) {
//     this.title = title;
//     this.desc = desc;
//     this.member = member;
//     this.date = date;
//     this.tag = tag;
//     this.status = status;
//     this.id = new Date().valueOf().toString();
//   }
// }

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
  dateElement.innerText = friendlyDate(newTaskCard.date);
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
