import { jData, saveCanvas } from "./dataManager.js";
import { TaskCard } from "./constructors.js";
// Selectors
const ctaNewTaskButton = document.querySelector("#cta-new-task-btn");
// CTA add new task & redirect
ctaNewTaskButton.addEventListener("click", () => {
  const ctaNewTaskTitle = document.querySelector("#cta-new-task-input").value;
  if (ctaNewTaskTitle) {
    const firstList = jData.board[0];
    const ctaNewTask = new TaskCard(
      ctaNewTaskTitle,
      "",
      "",
      "",
      "",
      `${firstList.title}`
    );
    firstList.taskCardSet.push(ctaNewTask);
    saveCanvas();
    location.href = "board-page.html";
  } else {
    location.href = "board-page.html";
  }
});
// CTA bar observer
const ctaBar = document.querySelector(".ctaBar");
const observer = new IntersectionObserver(
  //Add .isSticky if not 100% visible
  ([e]) => e.target.classList.toggle("isSticky", e.intersectionRatio < 1),
  //Run call back if not 100% visible
  { threshold: [1] }
);
//Observe CTA bar
observer.observe(ctaBar);
