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

newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userDate = new Date(newDateInput.value);
  if (
    newTitleInput.value &&
    newDescInput.value &&
    newMemberInput.value &&
    newDateInput.value &&
    newStatusInput.value
  ) {
    if (userDate > yesterday()) {
      successNew.classList.remove("d-none");
      errorDate.classList.add("d-none");
    } else {
      errorDate.classList.remove("d-none");
      successNew.classList.add("d-none");
    }
    errorFields.classList.add("d-none");
  } else {
    errorFields.classList.remove("d-none");
    successNew.classList.add("d-none");
  }
  //   Check Input Values
  console.log(newTitleInput.value);
  console.log(newDescInput.value);
  console.log(newMemberInput.value);
  console.log(newDateInput.value);
  console.log(newTagInput.value);
  console.log(newStatusInput.value);
});

// Yesterday
function yesterday() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
}
