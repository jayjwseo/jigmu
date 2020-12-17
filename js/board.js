const newTaskForm = document.querySelector("#new-task-form");
const newTitleInput = document.querySelector("#new-task-title");
const newDescInput = document.querySelector("#new-task-desc");
const newMemberInput = document.querySelector("#new-task-member");
const newDateInput = document.querySelector("#new-task-date");
const newTagInput = document.querySelector("#new-task-tag");
const newStatusInput = document.querySelector("#new-task-status");
const errorFields = document.querySelector("#error-fields");
const errorDate = document.querySelector("#error-date");
const successNew = document.querySelector("#success-new");
const newTaskModalClose = document.querySelectorAll(".new-task-modal-close");
const newTaskFormMessages = document.querySelectorAll(".new-task-form-message");
const taskCardCanvas = document.querySelectorAll(".task-card-canvas");
const taskCardTemplate = document.querySelector("#task-card-template");
// Local Storage Keys
const LOCAL_STORAGE_PREFIX = "JKBOARD_BOARD_CANVAS";
const TASK_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-TASK`;
// Task Card Set One Array & Render/Load
let taskCardsSetOne = loadCanvas();
taskCardsSetOne.forEach(renderTaskCard);

taskCardCanvas.forEach((canvas) => {
  canvas.addEventListener("click", (e) => {
    if (!e.target.matches("[data-status-change]")) return;
    const taskCard = e.target.closest(".task-card");
    const taskId = taskCard.dataset.taskCardId;
    const task = taskCardsSetOne.find((t) => t.id === taskId);
    task.status = e.target.innerText;
    taskCard.remove();
    renderTaskCard(task);
    saveCanvas();
  });
});

newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
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
      // Add task card
      const newTaskCard = new TaskManager(
        taskTitle,
        taskDesc,
        taskMember,
        taskDate,
        taskTag,
        taskStatus
      );
      taskCardsSetOne.push(newTaskCard);
      renderTaskCard(newTaskCard);
      saveCanvas();
      successNew.classList.remove("d-none");
      errorDate.classList.add("d-none");
      newTaskForm.reset();
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

// Date value generator for date input validation
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

  // Render Elements
  titleElement.innerText = newTaskCard.title;
  descElement.innerText = newTaskCard.desc.slice(0, 63);
  memberElement.innerText = newTaskCard.member;
  dateElement.innerText = friendlyDate(newTaskCard.date);
  tagElement.innerText = newTaskCard.tag;
  statusElement.innerText = newTaskCard.status;

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
  return JSON.parse(taskCardsSetOneString) || [];
}

//Save on local storage
function saveCanvas() {
  localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(taskCardsSetOne));
}
