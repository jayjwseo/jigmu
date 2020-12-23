//Select List Canvas
const taskCardCanvasBacklog = document.querySelector(
  "#task-card-canvas-backlog"
);
const taskCardCanvasTodo = document.querySelector("#task-card-canvas-todo");
const taskCardCanvasInprogress = document.querySelector(
  "#task-card-canvas-inprogress"
);
const taskCardCanvasReview = document.querySelector("#task-card-canvas-review");
const taskCardCanvasDone = document.querySelector("#task-card-canvas-done");
const taskCardCanvasObsolete = document.querySelector(
  "#task-card-canvas-obsolete"
);

// User friendly date format
function friendlyDate(date) {
  let dateInput = new Date(date);
  let frdlyDate = dateInput.toDateString();
  return frdlyDate;
}

function renderTaskCardClone(newTaskCard) {
  // Task Card Template
  const taskCardTemplate = document.querySelector("#task-card-template");

  //Clone Template Content
  const clone = taskCardTemplate.content.cloneNode(true);

  // Select Elements
  const titleElement = clone.querySelector("[data-task-card-title]");
  const descElement = clone.querySelector("[data-task-card-desc]");
  const memberElement = clone.querySelector("[data-task-card-member]");
  const dateElement = clone.querySelector("[data-task-card-date]");
  const statusElement = clone.querySelector("[data-task-card-status]");
  const tagElement = clone.querySelector("#task-card-tag-color");
  const taskCard = clone.querySelector(".task-card");

  //Elements Array
  const elements = [
    titleElement,
    descElement,
    memberElement,
    dateElement,
    statusElement,
  ];

  // Render Elements
  titleElement.innerText = newTaskCard.title;
  //Truncate task description length to 75 characters
  descElement.innerText = newTaskCard.desc.slice(0, 75);
  memberElement.innerText = newTaskCard.member;
  dateElement.innerText = newTaskCard.date
    ? friendlyDate(newTaskCard.date)
    : "";
  statusElement.innerText = newTaskCard.status;

  // Render Dataset ID
  taskCard.dataset.taskCardId = newTaskCard.id;

  //Render Tag Color
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

  //Hide when no value to display
  elements.forEach((element) => {
    const elementNoValue = element.closest(".task-card-element");
    if (element.innerText === "") {
      elementNoValue.classList.toggle("d-none");
    }
  });

  //Return rendered clone
  return clone;
}

// Render task card
function renderTaskCard(taskCard) {
  const taskCardClone = renderTaskCardClone(taskCard);
  // Append Template Clone
  let status = taskCard.status;
  switch (status) {
    case "BACKLOG":
      taskCardCanvasBacklog.appendChild(taskCardClone);
      break;
    case "TO DO":
      taskCardCanvasTodo.appendChild(taskCardClone);
      break;
    case "IN PROGRESS":
      taskCardCanvasInprogress.appendChild(taskCardClone);
      break;
    case "REVIEW":
      taskCardCanvasReview.appendChild(taskCardClone);
      break;
    case "DONE":
      taskCardCanvasDone.appendChild(taskCardClone);
      break;
    case "OBSOLETE":
      taskCardCanvasObsolete.appendChild(taskCardClone);
      break;
    default:
      console.log("Status Unknown");
  }
}

// Render update task card
function renderUpdateTaskCard(taskCard, taskCardElement) {
  const taskCardClone = renderTaskCardClone(taskCard);
  // Update target task card element
  taskCardElement.parentNode.replaceChild(taskCardClone, taskCardElement);
}

//Render add task card form
function renderAddNewTaskCardForm(canvas) {
  const addTaskCardTemplate = document.querySelector("#add-task-card-template");
  const clone = addTaskCardTemplate.content.cloneNode(true);
  canvas.insertBefore(clone, canvas.firstChild);
}

export { renderTaskCard, renderUpdateTaskCard, renderAddNewTaskCardForm };
