// Modules
import { jData, saveCanvas } from "./dataManager.js";
import TaskCard from "./constructors.js";
//Selectors
const ctaNewTaskButton = document.querySelector("#cta-new-task-btn");
console.log(ctaNewTaskButton);

// CTA add new task & redirect to board page
ctaNewTaskButton.addEventListener("click", () => {
  console.log("hi");
  const ctaNewTaskTitle = document.querySelector("#cta-new-task-input").value;
  if (ctaNewTaskTitle) {
    const ctaNewTask = new TaskCard(ctaNewTaskTitle, "", "", "", "", "BACKLOG");
    jData.taskCardsSet.push(ctaNewTask);
    saveCanvas();
    location.href = "board-page.html";
  } else {
    location.href = "board-page.html";
  }
});

// CTA bar is top sticky detector
const ctaBar = document.querySelector(".ctaBar");
const observer = new IntersectionObserver(
  //As long as the target element is not in full view, add .isSticky
  ([e]) => e.target.classList.toggle("isSticky", e.intersectionRatio < 1),
  //As soon as even 1px is not visible, run callback
  { threshold: [1] }
);
//Observe CTA bar
observer.observe(ctaBar);
