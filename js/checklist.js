// const inputBox = document.querySelector(".inputField input");
// const addBtn = document.querySelector(".inputField button");
// const formGroup = document.querySelector(".form-group");

// // Adding input
// inputBox.onkeyup = () => {
//     let userData = inputBox.value;
//     if(userData.trim() != 0){
//         addBtn.classList.add("active");
//     }else {
//         addBtn.classList.remove("active");
//     }
// }

// //   When user click add button

// addBtn.onclick = () => {
//     let userData = inputBox.value;
//     let getLocalStorage = localStorage.getItem("New Todo");
//     if(getLocalStorage == null){
// listArr = [];
//     }else{
//         listArr = JSON.parse(getLocalStorage);
//     }
//     listArr.push(userData);
//     localStorage.setItem("New Todo", JSON.stringify(listArr));
//     showTasks();
// }

// // Showing Tasks
// function showTasks(){
//     let getLocalStorage = localStorage.getItem("New Todo");
//     if(getLocalStorage == null){
//         listArr = [];
//     }else{
//         listArr = JSON.parse(getLocalStorage);
//     }
//     let newTaskTag = '';
//     listArr.forEach((element, index) => {
//         newTaskTag = '<label class="form-check-label" for="flexCheckDefault"></label> ${element} <span><i class="fas fa-trash"></i></span></li>';
//     });
//     formGroup.innerHTML = newTaskTag;
// }
