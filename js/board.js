import { jData, saveCanvas } from "./dataManager.js";
import {
  renderData,
  renderUpdateTaskCard,
  renderNewTaskCard,
  renderAddNewTaskCardForm,
} from "./boardRender.js";
import { TaskList, TaskCard } from "./constructors.js";
// Modal - form
const newTaskForm = document.querySelector("#new-task-form");
const newTitleInput = document.querySelector("#new-task-title");
const newDescInput = document.querySelector("#new-task-desc");
const newMemberInput = document.querySelector("#new-task-member");
const newDateInput = document.querySelector("#new-task-date");
const newTagInput = document.querySelector("#new-task-tag");
const newStatusInput = document.querySelector("#new-task-status");
// Modal - delete task button
const deleteTaskBtn = document.querySelector("#delete-task-button");
// Modal - current title & description
const currentTitle = document.querySelector("#current-task-title-hide");
const currentDesc = document.querySelector("#current-task-desc-hide");
// All list canvas & task card canvas
const listCanvas = document.querySelectorAll(".list-canvas");
const taskCardCanvas = document.querySelectorAll(".task-card-canvas");
// SELECTED task card object & element
let selectedTaskCard;
let selectedTaskCardElement;
// Render data
renderData(jData);
//Temp
let cardSet = jData.board[0].taskCardSet;
// Add new task card form
listCanvas.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (!e.target.matches(".add-task-btn")) return;
    const list = e.target.closest(".list-canvas");
    const taskCanvas = list.querySelector(".task-card-canvas");
    if (
      taskCanvas.firstElementChild &&
      taskCanvas.firstElementChild.classList.contains("add-task-card")
    ) {
      return;
    } else {
      renderAddNewTaskCardForm(taskCanvas);
    }
  });
});
// Add new task card
listCanvas.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.target.matches(".add-task-card-btn")) {
      e.preventDefault();
      const addNewTaskCardForm = e.target.closest(".add-task-card");
      const taskTitle = addNewTaskCardForm.querySelector("#add-task-card-title")
        .value;
      const listEle = e.target.closest(".task-card-canvas");
      const listId = listEle.dataset.listId;
      const listObj = jData.board.find((list) => list.id === listId);
      const taskStatus = listObj.title;
      if (taskTitle) {
        addTaskCard(
          taskTitle,
          taskStatus,
          listEle,
          listObj,
          addNewTaskCardForm
        );
      } else {
        return;
      }
    } else if (e.target.matches(".cancel-add-task-card-btn")) {
      e.preventDefault();
      const addNewTaskCard = e.target.closest(".add-task-card");
      addNewTaskCard.remove();
    } else {
      return;
    }
  });
});
// Update task card status
taskCardCanvas.forEach((canvas) => {
  canvas.addEventListener("click", (e) => {
    if (!e.target.matches(".data-status-change")) return;
    e.stopImmediatePropagation();
    const currentListEle = e.target.closest(".task-card-canvas");
    const currentListId = currentListEle.dataset.listId;
    const currentListObj = jData.board.find(
      (list) => list.id === currentListId
    );
    const taskCard = e.target.closest(".task-card");
    const listId = e.target.dataset.taskListId;
    const listEle = document.querySelector(`[data-list-id="${listId}"]`);
    const listObj = jData.board.find((list) => list.id === listId);
    const taskId = taskCard.dataset.taskCardId;
    const task = currentListObj.taskCardSet.find((t) => t.id === taskId);
    task.status = listObj.title;
    currentListObj.taskCardSet.splice(
      currentListObj.taskCardSet.indexOf(task),
      1
    );
    listObj.taskCardSet.splice(listObj.taskCardSet.length, 0, task);
    taskCard.remove();
    renderNewTaskCard(task, listEle, jData);
    saveCanvas();
  });
});
// Set selected task card & toggle modal
taskCardCanvas.forEach((card) => {
  card.addEventListener("click", (e) => {
    if (!e.target.matches(".task-card-edit-toggle")) return;
    const taskCard = e.target.closest(".task-card");
    const taskId = taskCard.dataset.taskCardId;
    const task = cardSet.find((t) => t.id === taskId);
    //Set to global variables
    selectedTaskCardElement = taskCard;
    selectedTaskCard = task;
    //Pass current title & desc to modal elements
    const currentTitleElement = document.querySelector(
      "[data-current-task-title]"
    );
    const currentDescElement = document.querySelector(
      "[data-current-task-desc]"
    );
    currentTitleElement.innerText = task.title;
    if (task.desc) {
      currentDescElement.innerText = task.desc;
    } else {
      currentDescElement.innerText = "Click to add description...";
    }
    //Pass current values to fields
    newTitleInput.value = task.title;
    newDescInput.value = task.desc;
    newMemberInput.value = task.member;
    newDateInput.value = task.date;
    newTagInput.value = task.tag;
    newStatusInput.value = task.status;
    $("#new-task-modal").modal("show");
  });
});
// Modal - task card update
newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // User input values
  const taskTitle = newTitleInput.value;
  const taskDesc = newDescInput.value;
  const taskMember = newMemberInput.value;
  const taskTag = newTagInput.value;
  const taskStatus = newStatusInput.value;
  const taskDate = newDateInput.value;
  // Select modal form messages
  const errorFields = document.querySelector("#error-fields");
  const errorDate = document.querySelector("#error-date");
  // Check due date input is not in the past
  const userDate = new Date(taskDate);
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
    errorDate.classList.add("d-none");
    errorFields.classList.remove("d-none");
  } else {
    errorDate.classList.remove("d-none");
    errorFields.classList.add("d-none");
  }
});
// Modal - show title input
currentTitle.addEventListener("click", () => {
  currentTitle.classList.add("d-none");
  newTitleInput.classList.remove("d-none");
});
// Modal - show desc input
currentDesc.addEventListener("click", () => {
  currentDesc.classList.add("d-none");
  newDescInput.classList.remove("d-none");
});
// Modal - delete Task
deleteTaskBtn.addEventListener("click", () => {
  deleteTaskCard();
});
// Modal - reset on close
$("#new-task-modal").on("hide.bs.modal", () => {
  const newTaskFormMessages = document.querySelectorAll(
    ".new-task-form-message"
  );
  newTaskForm.reset();
  clearMessages(newTaskFormMessages);
  currentTitle.classList.remove("d-none");
  newTitleInput.classList.add("d-none");
  currentDesc.classList.remove("d-none");
  newDescInput.classList.add("d-none");
});

// <-FUNCTIONS->
// Clear form messages
function clearMessages(messages) {
  messages.forEach((msg) => {
    msg.classList.add("d-none");
  });
}
// Generate date validation reference
function dateValidRef() {
  // Today w/o timestamp
  const y = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  // Today minus 1ms
  const ref = new Date(y.setMilliseconds(y.getMilliseconds() - 1));
  return ref;
}
// Add task card
function addTaskCard(title, status, listEle, listObj, removeAddForm) {
  const newTaskCard = new TaskCard(title, "", "", "", "", status);
  listObj.taskCardSet.push(newTaskCard);
  console.log(newTaskCard);
  console.log(listEle);
  renderNewTaskCard(newTaskCard, listEle, jData);
  saveCanvas();
  removeAddForm.remove();
}
// Update task Card
function updateTaskCard(title, desc, member, date, tag, status) {
  //Check if there is a status change
  const statusChange = selectedTaskCard.status === status ? false : true;
  //Update selected task card with new user inputs
  selectedTaskCard.title = title;
  selectedTaskCard.desc = desc;
  selectedTaskCard.member = member;
  selectedTaskCard.date = date;
  selectedTaskCard.tag = tag;
  selectedTaskCard.status = status;
  //Render new task card
  if (statusChange) {
    selectedTaskCardElement.remove();
    renderNewTaskCard(selectedTaskCard, "", jData);
  } else {
    renderUpdateTaskCard(selectedTaskCard, selectedTaskCardElement);
  }
  saveCanvas();
  $("#new-task-modal").modal("hide");
}
// Delete task card
function deleteTaskCard() {
  jData.board[0].taskCardSet = cardSet.filter(
    (task) => task.id !== selectedTaskCard.id
  );
  selectedTaskCardElement.remove();
  saveCanvas();
  $("#new-task-modal").modal("hide");
}
