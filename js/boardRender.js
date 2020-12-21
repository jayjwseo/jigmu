// User friendly date format
function friendlyDate(date) {
  let dateInput = new Date(date);
  let frdlyDate = dateInput.toDateString();
  return frdlyDate;
}

// Render task card
function renderTaskCard(newTaskCard) {
  // Task Card Template
  const taskCardTemplate = document.querySelector("#task-card-template");

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

//Render add task card
function renderAddNewTaskCard(canvas) {
  const addTaskCardTemplate = document.querySelector("#add-task-card-template");
  const clone = addTaskCardTemplate.content.cloneNode(true);
  canvas.insertBefore(clone, canvas.firstChild);
}

export { renderTaskCard, renderAddNewTaskCard };
