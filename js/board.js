import { jData, saveCanvas } from "./dataManager.js";
import {
  clearBoard,
  renderData,
  renderNewList,
  renderAddListForm,
  renderUpdateTaskCard,
  renderNewTaskCard,
  renderAddNewTaskCardForm,
  renderModalStatusOption,
} from "./boardRender.js";
import { TaskList, TaskCard } from "./constructors.js";
// Render data
renderData(jData);
// Modal - form
const newTaskForm = document.querySelector("#new-task-form");
const newTitleInput = document.querySelector("#new-task-title");
const newDescInput = document.querySelector("#new-task-desc");
const newMemberInput = document.querySelector("#new-task-member");
const newDateInput = document.querySelector("#new-task-date");
const newTagInput = document.querySelector("#new-task-tag");
const newStatusInput = document.querySelector("#new-task-status");
const deleteTaskBtn = document.querySelector("#delete-task-button");
const currentTitle = document.querySelector("#current-task-title-hide");
const currentDesc = document.querySelector("#current-task-desc-hide");
// Selected task card object & element
let selectedTaskCardElement;
let selectedTaskCardObj;
let selectedTaskCardListObj;
// Add new list form
document.addEventListener("click", (e) => {
  if (!e.target.matches(".add-list-title")) return;
  const addListSection = e.target.closest(".add-list-section");
  const addListCanvas = addListSection.querySelector(".add-list-canvas");
  if (
    addListCanvas.firstElementChild &&
    addListCanvas.firstElementChild.classList.contains("add-list")
  ) {
    return;
  } else {
    renderAddListForm(addListCanvas);
  }
});
// Add new list
document.addEventListener("click", (e) => {
  if (e.target.matches(".add-list-btn")) {
    e.preventDefault();
    const addListSection = e.target.closest(".add-list-section");
    const addListForm = e.target.closest(".add-list");
    const addListTitle = addListForm.querySelector("#add-list-title").value;
    if (addListTitle) {
      const newList = new TaskList(addListTitle);
      jData.board.push(newList);
      addListSection.remove();
      renderNewList(newList, jData);
      saveCanvas();
    } else {
      return;
    }
  } else if (e.target.matches(".cancel-add-list-btn")) {
    e.preventDefault();
    const addListForm = e.target.closest(".add-list");
    addListForm.remove();
  } else {
    return;
  }
});
// Add new task card form
document.addEventListener("click", (e) => {
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
// Add new task card
document.addEventListener("click", (e) => {
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
      addTaskCard(taskTitle, taskStatus, listEle, listObj, addNewTaskCardForm);
    } else {
      return;
    }
  } else if (e.target.matches(".cancel-add-task-card-btn")) {
    e.preventDefault();
    const addNewTaskCardForm = e.target.closest(".add-task-card");
    addNewTaskCardForm.remove();
  } else {
    return;
  }
});
// Change list order
document.addEventListener("click", (e) => {
  if (!e.target.matches(".list-order-change")) return;
  const currentList = e.target.closest(".list-canvas");
  const currentListTaskCanvas = currentList.querySelector(".task-card-canvas");
  const currentListId = currentListTaskCanvas.dataset.listId;
  const currentListObj = jData.board.find((list) => list.id === currentListId);
  const toOrder = e.target.dataset.listOrder;
  jData.board.splice(jData.board.indexOf(currentListObj), 1);
  jData.board.splice(toOrder, 0, currentListObj);
  clearBoard();
  renderData(jData);
  saveCanvas();
});
// Delete list
document.addEventListener("click", (e) => {
  if (!e.target.matches(".list-delete")) return;
  const currentList = e.target.closest(".list-canvas");
  const currentListTaskCanvas = currentList.querySelector(".task-card-canvas");
  const currentListId = currentListTaskCanvas.dataset.listId;
  const currentListObj = jData.board.find((list) => list.id === currentListId);
  jData.board.splice(jData.board.indexOf(currentListObj), 1);
  clearBoard();
  renderData(jData);
  saveCanvas();
});
// Update task card status
document.addEventListener("click", (e) => {
  if (!e.target.matches(".data-status-change")) return;
  e.stopImmediatePropagation();
  const currentListEle = e.target.closest(".task-card-canvas");
  const currentListId = currentListEle.dataset.listId;
  const currentListObj = jData.board.find((list) => list.id === currentListId);
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
// Set selected task card & toggle modal
document.addEventListener("click", (e) => {
  if (!e.target.matches(".task-card-edit-toggle")) return;
  const currentListEle = e.target.closest(".task-card-canvas");
  const currentListId = currentListEle.dataset.listId;
  const currentListObj = jData.board.find((list) => list.id === currentListId);
  const taskCard = e.target.closest(".task-card");
  const taskId = taskCard.dataset.taskCardId;
  const task = currentListObj.taskCardSet.find((t) => t.id === taskId);
  // Set to global variables
  selectedTaskCardElement = taskCard;
  selectedTaskCardObj = task;
  selectedTaskCardListObj = currentListObj;
  // Pass current values
  const currentTitleElement = document.querySelector(
    "[data-current-task-title]"
  );
  const currentDescElement = document.querySelector("[data-current-task-desc]");
  currentTitleElement.innerText = task.title;
  if (task.desc) {
    currentDescElement.innerText = task.desc;
  } else {
    currentDescElement.innerText = "Click to add description...";
  }
  newTitleInput.value = task.title;
  newDescInput.value = task.desc;
  newMemberInput.value = task.member;
  newDateInput.value = task.date;
  newTagInput.value = task.tag;
  renderModalStatusOption(jData);
  newStatusInput.value = task.status;
  $("#new-task-modal").modal("show");
});
// Modal - update task card
newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskTitle = newTitleInput.value;
  const taskDesc = newDescInput.value;
  const taskMember = newMemberInput.value;
  const taskTag = newTagInput.value;
  const taskStatus = newStatusInput.value;
  const taskDate = newDateInput.value;
  const errorFields = document.querySelector("#error-fields");
  const errorDate = document.querySelector("#error-date");
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
  const statusOption = document.querySelector("[data-modal-list-option]");
  statusOption.querySelectorAll("*").forEach((option) => option.remove());
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
  renderNewTaskCard(newTaskCard, listEle, jData);
  saveCanvas();
  removeAddForm.remove();
}
// Update task Card
function updateTaskCard(title, desc, member, date, tag, status) {
  // Status change?
  const statusChange = selectedTaskCardObj.status === status ? false : true;
  selectedTaskCardObj.title = title;
  selectedTaskCardObj.desc = desc;
  selectedTaskCardObj.member = member;
  selectedTaskCardObj.date = date;
  selectedTaskCardObj.tag = tag;
  selectedTaskCardObj.status = status;
  if (statusChange) {
    const listObj = jData.board.find((list) => list.title === status);
    const listId = listObj.id;
    const listEle = document.querySelector(`[data-list-id="${listId}"]`);
    selectedTaskCardListObj.taskCardSet.splice(
      selectedTaskCardListObj.taskCardSet.indexOf(selectedTaskCardObj),
      1
    );
    listObj.taskCardSet.splice(
      listObj.taskCardSet.length,
      0,
      selectedTaskCardObj
    );
    selectedTaskCardElement.remove();
    renderNewTaskCard(selectedTaskCardObj, listEle, jData);
  } else {
    renderUpdateTaskCard(selectedTaskCardObj, selectedTaskCardElement, jData);
  }
  saveCanvas();
  $("#new-task-modal").modal("hide");
}
// Delete task card
function deleteTaskCard() {
  selectedTaskCardListObj.taskCardSet = selectedTaskCardListObj.taskCardSet.filter(
    (task) => task.id !== selectedTaskCardObj.id
  );
  selectedTaskCardElement.remove();
  saveCanvas();
  $("#new-task-modal").modal("hide");
}
