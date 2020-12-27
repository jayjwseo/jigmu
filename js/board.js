// Modules
import { jData, saveCanvas } from "./dataManager.js";
import {
  renderTaskCard,
  renderUpdateTaskCard,
  renderAddNewTaskCardForm,
} from "./boardRender.js";
import TaskCard from "./constructors.js";
// Select modal form user input fields
const newTaskForm = document.querySelector("#new-task-form");
const newTitleInput = document.querySelector("#new-task-title");
const newDescInput = document.querySelector("#new-task-desc");
const newMemberInput = document.querySelector("#new-task-member");
const newDateInput = document.querySelector("#new-task-date");
const newTagInput = document.querySelector("#new-task-tag");
const newStatusInput = document.querySelector("#new-task-status");
// Select modal form messages
const errorFields = document.querySelector("#error-fields");
const errorDate = document.querySelector("#error-date");
// Select modal delete task button
const deleteTaskBtn = document.querySelector("#delete-task-button");
// Select modal current title & desc element
const currentTitle = document.querySelector("#current-task-title-hide");
const currentDesc = document.querySelector("#current-task-desc-hide");
// Select error messages for modal form reset
const newTaskFormMessages = document.querySelectorAll(".new-task-form-message");
// Select all list canvas
const listCanvas = document.querySelectorAll(".list-canvas");
// Select all task card canvas
const taskCardCanvas = document.querySelectorAll(".task-card-canvas");
// Data render/load
jData.taskCardsSet.forEach(renderTaskCard);
// SELECTED task card & element
let selectedTaskCard;
let selectedTaskCardElement;

//Set selected task card & toggle update modal
taskCardCanvas.forEach((card) => {
  card.addEventListener("click", (e) => {
    if (!e.target.matches(".task-card-edit-toggle")) return;
    const taskCard = e.target.closest(".task-card");
    const taskId = taskCard.dataset.taskCardId;
    const task = jData.taskCardsSet.find((t) => t.id === taskId);
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

//Task card status update & re-locate
taskCardCanvas.forEach((canvas) => {
  canvas.addEventListener("click", (e) => {
    if (!e.target.matches("[data-status-change]")) return;
    e.stopImmediatePropagation();
    const taskCard = e.target.closest(".task-card");
    const taskId = taskCard.dataset.taskCardId;
    //Look for the task in the array using the id
    const task = jData.taskCardsSet.find((t) => t.id === taskId);
    //Update the status of the referenced task
    task.status = e.target.innerText;
    //Remove task card from the previous location(list)
    taskCard.remove();
    //Render task card to the new location(list)
    renderTaskCard(task);
    saveCanvas();
  });
});

//Add task card form trigger
listCanvas.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (!e.target.matches(".add-task-btn")) return;
    const list = e.target.closest(".list-canvas");
    const taskCanvas = list.querySelector(".task-card-canvas");
    //Render add task card if not already exist
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

//Add task card
listCanvas.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    //When add task button is clicked
    if (e.target.matches(".add-task-card-btn")) {
      e.preventDefault();
      //Get task title
      const addNewTaskCard = e.target.closest(".add-task-card");
      const taskTitle = addNewTaskCard.querySelector("#add-task-card-title")
        .value;
      //Get list status
      const taskCardCanvas = e.target.closest(".task-card-canvas");
      const taskStatus = taskCardCanvas.dataset.taskCardCanvas;
      //Add task only if task title is entered
      if (taskTitle) {
        addTaskCard(taskTitle, taskStatus, addNewTaskCard);
      } else {
        return;
      }
    }
    //When cancel add task button is clicked
    else if (e.target.matches(".cancel-add-task-card-btn")) {
      e.preventDefault();
      const addNewTaskCard = e.target.closest(".add-task-card");
      addNewTaskCard.remove();
    }
    //When neither button is clicked
    else {
      return;
    }
  });
});

//Task card update - Modal
newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //User input values
  const taskTitle = newTitleInput.value;
  const taskDesc = newDescInput.value;
  const taskMember = newMemberInput.value;
  const taskTag = newTagInput.value;
  const taskStatus = newStatusInput.value;
  const taskDate = newDateInput.value;
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

// Delete Task
deleteTaskBtn.addEventListener("click", () => {
  deleteTaskCard();
});

//Show title input when current title is clicked
currentTitle.addEventListener("click", () => {
  currentTitle.classList.add("d-none");
  newTitleInput.classList.remove("d-none");
});

//Show desc input when current title is clicked
currentDesc.addEventListener("click", () => {
  currentDesc.classList.add("d-none");
  newDescInput.classList.remove("d-none");
});

// Reset modal on close
$("#new-task-modal").on("hide.bs.modal", () => {
  newTaskForm.reset();
  clearMessages(newTaskFormMessages);
  currentTitle.classList.remove("d-none");
  newTitleInput.classList.add("d-none");
  currentDesc.classList.remove("d-none");
  newDescInput.classList.add("d-none");
});

//FUNCTIONS--------------------------------------------------------->

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

//Update Task Card
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
    renderTaskCard(selectedTaskCard);
  } else {
    renderUpdateTaskCard(selectedTaskCard, selectedTaskCardElement);
  }
  saveCanvas();
  $("#new-task-modal").modal("hide");
}

//Delete Task Card
function deleteTaskCard() {
  //Delete selected task from array
  jData.taskCardsSet = jData.taskCardsSet.filter(
    (task) => task.id !== selectedTaskCard.id
  );
  selectedTaskCardElement.remove();
  saveCanvas();
  $("#new-task-modal").modal("hide");
}

//Add Task Card
function addTaskCard(title, status, removeAddForm) {
  const newTaskCard = new TaskCard(title, "", "", "", "", status);
  jData.taskCardsSet.push(newTaskCard);
  renderTaskCard(newTaskCard);
  saveCanvas();
  removeAddForm.remove();
}
