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
const taskCardCanvas = document.querySelector("#task-card-canvas");
const taskCardTemplate = document.querySelector("#task-card-template");
const LOCAL_STORAGE_PREFIX = "JKBOARD_BOARD_CANVAS";
const TASK_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-TASK`;
let taskCardsSetOne = loadCanvas();
taskCardsSetOne.forEach(renderTaskCard);

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
  if (taskTitle && taskDesc && taskMember && taskDate && taskStatus) {
    // Check due date input is not in the past
    if (userDate > yesterday()) {
      // Add task card
      const newTaskCard = new TaskCard(
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

// Task card constructor
class TaskCard {
  constructor(title, desc, member, date, tag, status) {
    this.title = title;
    this.desc = desc;
    this.member = member;
    this.date = date;
    this.tag = tag;
    this.status = status;
    this.id = new Date().valueOf().toString();
  }
}

// Render task card
function renderTaskCard(newTaskCard) {
  const taskCardTemplateClone = taskCardTemplate.content.cloneNode(true);
  const taskCard = taskCardTemplateClone.querySelector(".task-card");
  const titleElement = taskCardTemplateClone.querySelector(
    "[data-task-card-title]"
  );
  const descElement = taskCardTemplateClone.querySelector(
    "[data-task-card-desc]"
  );
  const memberElement = taskCardTemplateClone.querySelector(
    "[data-task-card-member]"
  );
  const dateElement = taskCardTemplateClone.querySelector(
    "[data-task-card-date]"
  );
  const tagElement = taskCardTemplateClone.querySelector(
    "[data-task-card-tag]"
  );
  const statusElement = taskCardTemplateClone.querySelector(
    "[data-task-card-status]"
  );
  taskCard.dataset.taskCardId = newTaskCard.id;
  titleElement.innerText = newTaskCard.title;
  descElement.innerText = newTaskCard.desc.slice(0, 63);
  memberElement.innerText = newTaskCard.member;
  dateElement.innerText = friendlyDate(newTaskCard.date);
  tagElement.innerText = newTaskCard.tag;
  statusElement.innerText = newTaskCard.status;
  taskCardCanvas.appendChild(taskCardTemplateClone);
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
