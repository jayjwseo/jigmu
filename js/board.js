// new-task-form Validation
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

newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Check all fields have input
  const userDate = new Date(newDateInput.value);
  if (
    newTitleInput.value &&
    newDescInput.value &&
    newMemberInput.value &&
    newDateInput.value &&
    newStatusInput.value
  ) {
    // Check due date input is not in the past
    if (userDate > yesterday()) {
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

  // Check user input values
  console.log(newTitleInput.value);
  console.log(newDescInput.value);
  console.log(newMemberInput.value);
  console.log(newDateInput.value);
  console.log(newTagInput.value);
  console.log(newStatusInput.value);
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
