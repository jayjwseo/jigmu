// Convert to user friendly date format
function friendlyDate(date) {
  let dateInput = new Date(date);
  let frdlyDate = dateInput.toDateString();
  return frdlyDate;
}
// Truncate description length on task card
function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}
// Create status select option element
function createSelectOption(list) {
  const listTitle = list.title;
  const element = document.createElement("option");
  element.innerText = listTitle;
  element.value = listTitle;
  return element;
}
// Create status dropdown option element
function createDropOption(list) {
  const listTitle = list.title;
  const listId = list.id;
  const element = document.createElement("a");
  element.innerText = listTitle;
  element.dataset.taskListId = listId;
  element.classList.add(
    "dropdown-item",
    "task-card-drop-item",
    "data-status-change"
  );
  return element;
}
// Create list fragment
function createListClone(newList) {
  const listTemplate = document.querySelector("#list-template");
  const clone = listTemplate.content.cloneNode(true);
  // Clone selectors
  const titleElement = clone.querySelector("[data-list-title]");
  const canvasElement = clone.querySelector(".task-card-canvas");
  titleElement.innerText = newList.title;
  canvasElement.dataset.listId = newList.id;
  // Return fragment
  return clone;
}
// Create task card fragment
function createTaskCardClone(newTaskCard) {
  const taskCardTemplate = document.querySelector("#task-card-template");
  const clone = taskCardTemplate.content.cloneNode(true);
  // Clone selectors
  const titleElement = clone.querySelector("[data-task-card-title]");
  const descElement = clone.querySelector("[data-task-card-desc]");
  const memberElement = clone.querySelector("[data-task-card-member]");
  const dateElement = clone.querySelector("[data-task-card-date]");
  const statusElement = clone.querySelector("[data-task-card-status]");
  const tagElement = clone.querySelector("#task-card-tag-color");
  const taskCard = clone.querySelector(".task-card");
  // Elements Array
  const elements = [
    titleElement,
    descElement,
    memberElement,
    dateElement,
    statusElement,
  ];
  // Inject values
  titleElement.innerText = newTaskCard.title;
  descElement.innerText = truncateString(newTaskCard.desc, 65);
  memberElement.innerText = newTaskCard.member;
  dateElement.innerText = newTaskCard.date
    ? friendlyDate(newTaskCard.date)
    : "";
  statusElement.innerText = newTaskCard.status;
  taskCard.dataset.taskCardId = newTaskCard.id;
  // Color tag style
  let tagColor = newTaskCard.tag;
  switch (tagColor) {
    case "Blue":
      tagElement.style.borderColor = "#02549A";
      break;
    case "Red":
      tagElement.style.borderColor = "#D35C78";
      break;
    case "Yellow":
      tagElement.style.borderColor = "#F7E562";
      break;
    case "Green":
      tagElement.style.borderColor = "#04AB83";
      break;
    case "Gray":
      tagElement.style.borderColor = "#A4A4A7";
      break;
    default:
      tagElement.classList.toggle("d-none");
  }
  // Hide if no value
  elements.forEach((element) => {
    const elementNoValue = element.closest(".task-card-element");
    if (element.innerText === "") {
      elementNoValue.classList.toggle("d-none");
    }
  });
  // Return fragment
  return clone;
}
// Render status drop option
function renderStatusDropOption(jData, scope) {
  const dropMenu = scope.querySelectorAll("[data-status-drop-option]");
  dropMenu.forEach((item) => {
    jData.board.forEach((list) => {
      item.appendChild(createDropOption(list));
    });
  });
}
// <-EXPORT->
// Render Data
function renderData(jData) {
  jData.board.forEach((list) => {
    // Render list
    const board = document.querySelector("#board");
    const listElement = createListClone(list);
    board.append(listElement);
    // Render Tasks
    const listId = list.id;
    const cardList = document.querySelector(`[data-list-id="${listId}"]`);
    const taskCards = list.taskCardSet;
    taskCards.forEach((taskCard) => {
      const taskCardElement = createTaskCardClone(taskCard);
      cardList.append(taskCardElement);
    });
  });
  renderStatusDropOption(jData, document);
}
// Render new task card form
function renderAddNewTaskCardForm(canvas) {
  const addTaskCardTemplate = document.querySelector("#add-task-card-template");
  const clone = addTaskCardTemplate.content.cloneNode(true);
  canvas.insertBefore(clone, canvas.firstChild);
}
// Render new task card
function renderNewTaskCard(newTaskCard, listEle, jData) {
  const taskCardElement = createTaskCardClone(newTaskCard);
  listEle.append(taskCardElement);
  const taskCard = document.querySelector(
    `[data-task-card-id="${newTaskCard.id}"]`
  );
  renderStatusDropOption(jData, taskCard);
}
// Render update task card
function renderUpdateTaskCard(taskCard, taskCardElement, jData) {
  const taskCardClone = createTaskCardClone(taskCard);
  renderStatusDropOption(jData, taskCardClone);
  taskCardElement.parentNode.replaceChild(taskCardClone, taskCardElement);
}
// Render modal status select option
function renderModalStatusOption(jData) {
  const selectMenu = document.querySelector("[data-modal-list-option]");
  jData.board.forEach((list) => {
    selectMenu.appendChild(createSelectOption(list));
  });
}
// Export
export {
  renderData,
  renderAddNewTaskCardForm,
  renderNewTaskCard,
  renderUpdateTaskCard,
  renderModalStatusOption,
};
