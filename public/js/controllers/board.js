// Firebase App (the core Firebase SDK)
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
// Auth and Firestore references
const auth = firebase.auth();
const db = firebase.firestore();
const docRef = db.collection("boards");
// >
import $ from "jquery";
import "bootstrap";
import "regenerator-runtime/runtime";
import "../../css/board.scss";
import "@fortawesome/fontawesome-free/css/all.css";
// import { jData, saveCanvas } from "../services/dataManager.js";
import {
  renderData,
  renderAddListForm,
  renderAddNewTaskCardForm,
  renderModalStatusOption,
} from "../services/boardRender.js";
import { dragDrop } from "../services/dragDrop.js";
import { ListModel } from "../models/listModel.js";
import { TaskModel } from "../models/taskModel.js";
import { clearMessages, dateValidRef } from "../utils/utils.js";
import {
  logOut,
  displayUsername,
  isUserNotAuth,
  listenData,
} from "../firebase/fb";
// Realtime database listener
listenData(renderData);
// onLoad
window.addEventListener("load", () => {
  isUserNotAuth();
  // Local Storage Code***
  // renderData(jData);
  console.log("Welcome to Jigmu!");
  console.log("Developer: Jay JW Seo");
  console.log("Find me @ https://me.jayjwseo.com");
});
// Selected task global variables
let selectedTaskCardElement;
let selectedListId;
let selectedTaskId;
// Selectors - Modal
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
// AUTH CONTROL >>>
// Log out
const logOutBtn = document.querySelector("#log-out");
logOutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  logOut();
});
// Display username
const userName = document.querySelector("#navbarDropdown");
displayUsername(userName);
// LIST CONTROL >>>
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
      auth.onAuthStateChanged((user) => {
        if (user) {
          docRef
            .doc(user.uid)
            .get()
            .then((ss) => {
              const jData = ss.data();
              ListModel.addList(addListTitle, addListSection, jData);
              docRef.doc(user.uid).set(jData);
            });
        } else {
          console.error("User not logged in");
        }
      });
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
// Change list order
document.addEventListener("click", (e) => {
  if (!e.target.matches(".list-order-change")) return;
  const currentList = e.target.closest(".list-canvas");
  const currentListTaskCanvas = currentList.querySelector(".task-card-canvas");
  const currentListId = currentListTaskCanvas.dataset.listId;
  const toOrder = e.target.dataset.listOrder;
  auth.onAuthStateChanged((user) => {
    if (user) {
      docRef
        .doc(user.uid)
        .get()
        .then((ss) => {
          const jData = ss.data();
          const currentListObj = jData.board.find(
            (list) => list.id === currentListId
          );
          ListModel.changeOrder(currentListObj, toOrder, jData);
          docRef.doc(user.uid).set(jData);
        });
    } else {
      console.error("User not logged in");
    }
  });
});
// Delete list
document.addEventListener("click", (e) => {
  if (!e.target.matches(".list-delete")) return;
  const currentList = e.target.closest(".list-canvas");
  const currentListTaskCanvas = currentList.querySelector(".task-card-canvas");
  const currentListId = currentListTaskCanvas.dataset.listId;
  auth.onAuthStateChanged((user) => {
    if (user) {
      docRef
        .doc(user.uid)
        .get()
        .then((ss) => {
          const jData = ss.data();
          const currentListObj = jData.board.find(
            (list) => list.id === currentListId
          );
          ListModel.deleteList(currentListObj, jData);
          docRef.doc(user.uid).set(jData);
        });
    } else {
      console.error("User not logged in");
    }
  });
});
// TASK CARD CONTROL >>>
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

    if (taskTitle) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          docRef
            .doc(user.uid)
            .get()
            .then((ss) => {
              const jData = ss.data();
              const listEle = e.target.closest(".task-card-canvas");
              const listId = listEle.dataset.listId;
              const listObj = jData.board.find((list) => list.id === listId);
              const taskStatus = listObj.title;
              TaskModel.addTaskCard(taskTitle, taskStatus, listEle, listObj);
              // saveCanvas();
              // addNewTaskCardForm.remove();
              // console.log(jData);
              docRef.doc(user.uid).set(jData);
            });
        } else {
          console.error("User not logged in");
        }
      });
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
// Update task card status
document.addEventListener("click", (e) => {
  if (!e.target.matches(".data-status-change")) return;
  e.stopImmediatePropagation();
  auth.onAuthStateChanged((user) => {
    if (user) {
      docRef
        .doc(user.uid)
        .get()
        .then((ss) => {
          const jData = ss.data();
          const currentListEle = e.target.closest(".task-card-canvas");
          const currentListId = currentListEle.dataset.listId;
          const currentListObj = jData.board.find(
            (list) => list.id === currentListId
          );
          const taskCard = e.target.closest(".task-card");
          const toListId = e.target.dataset.taskListId;
          const toListEle = document.querySelector(
            `[data-list-id="${toListId}"]`
          );
          const toListObj = jData.board.find((list) => list.id === toListId);
          const taskId = taskCard.dataset.taskCardId;
          const task = currentListObj.taskCardSet.find((t) => t.id === taskId);
          TaskModel.updateStatus(
            task,
            currentListObj,
            toListObj,
            toListEle,
            taskCard
          );
          docRef.doc(user.uid).set(jData);
        });
    } else {
      console.error("User not logged in");
    }
  });
});
// Set selected task card & toggle modal
document.addEventListener("click", (e) => {
  if (!e.target.matches(".task-card-edit-toggle")) return;
  const currentListEle = e.target.closest(".task-card-canvas");
  const currentListId = currentListEle.dataset.listId;
  const taskCard = e.target.closest(".task-card");
  const currentTaskId = taskCard.dataset.taskCardId;

  selectedTaskCardElement = taskCard;
  selectedListId = currentListId;
  selectedTaskId = currentTaskId;

  auth.onAuthStateChanged((user) => {
    if (user) {
      docRef
        .doc(user.uid)
        .get()
        .then((ss) => {
          const jData = ss.data();
          const selectedTaskCardListObj = jData.board.find(
            (list) => list.id === selectedListId
          );
          const selectedTaskCardObj = selectedTaskCardListObj.taskCardSet.find(
            (t) => t.id === selectedTaskId
          );
          // Pass current values
          const currentTitleElement = document.querySelector(
            "[data-current-task-title]"
          );
          const currentDescElement = document.querySelector(
            "[data-current-task-desc]"
          );
          currentTitleElement.innerText = selectedTaskCardObj.title;
          if (selectedTaskCardObj.desc) {
            currentDescElement.innerText = selectedTaskCardObj.desc;
          } else {
            currentDescElement.innerText = "Click to add description...";
          }
          newTitleInput.value = selectedTaskCardObj.title;
          newDescInput.value = selectedTaskCardObj.desc;
          newMemberInput.value = selectedTaskCardObj.member;
          newDateInput.value = selectedTaskCardObj.date;
          newTagInput.value = selectedTaskCardObj.tag;
          renderModalStatusOption(jData);
          newStatusInput.value = selectedTaskCardObj.status;
          $("#new-task-modal").modal("show");
          // docRef.doc(user.uid).set(jData);
        });
    } else {
      console.error("User not logged in");
    }
  });
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
    auth.onAuthStateChanged((user) => {
      if (user) {
        docRef
          .doc(user.uid)
          .get()
          .then((ss) => {
            const jData = ss.data();
            const selectedTaskCardListObj = jData.board.find(
              (list) => list.id === selectedListId
            );
            const selectedTaskCardObj = selectedTaskCardListObj.taskCardSet.find(
              (t) => t.id === selectedTaskId
            );
            TaskModel.updateTaskCard(
              selectedTaskCardListObj,
              selectedTaskCardObj,
              selectedTaskCardElement,
              taskTitle,
              taskDesc,
              taskMember,
              taskDate,
              taskTag,
              taskStatus,
              jData
            );
            // saveCanvas();
            docRef.doc(user.uid).set(jData);
            $("#new-task-modal").modal("hide");
          });
      } else {
        console.error("User not logged in");
      }
    });
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
  auth.onAuthStateChanged((user) => {
    if (user) {
      docRef
        .doc(user.uid)
        .get()
        .then((ss) => {
          const jData = ss.data();
          const selectedTaskCardListObj = jData.board.find(
            (list) => list.id === selectedListId
          );
          const selectedTaskCardObj = selectedTaskCardListObj.taskCardSet.find(
            (t) => t.id === selectedTaskId
          );
          TaskModel.deleteTaskCard(
            selectedTaskCardListObj,
            selectedTaskCardObj
          );
          selectedTaskCardElement.remove();
          $("#new-task-modal").modal("hide");
          docRef.doc(user.uid).set(jData);
        });
    } else {
      console.error("User not logged in");
    }
  });
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
// DRAG AND DROP CONTROL >>>
dragDrop(dragComplete);
// Callback
function dragComplete(e) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      docRef
        .doc(user.uid)
        .get()
        .then((ss) => {
          const jData = ss.data();
          const fromListId = e.startDropZone.dataset.listId;
          const fromListObj = jData.board.find(
            (list) => list.id === fromListId
          );
          const toListId = e.endDropZone.dataset.listId;
          const toListObj = jData.board.find((list) => list.id === toListId);
          const taskCardId = e.taskCard.dataset.taskCardId;
          const taskCardObj = fromListObj.taskCardSet.find(
            (task) => task.id === taskCardId
          );
          const taskCardIndex = e.index;
          taskCardObj.status = toListObj.title;
          fromListObj.taskCardSet.splice(
            fromListObj.taskCardSet.indexOf(taskCardObj),
            1
          );
          toListObj.taskCardSet.splice(taskCardIndex, 0, taskCardObj);
          docRef.doc(user.uid).set(jData);
        });
    } else {
      console.error("User not logged in");
    }
  });
}
