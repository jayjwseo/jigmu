import "bootstrap";
import "../../css/landing.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import "regenerator-runtime/runtime";
import { jData, saveCanvas } from "../services/dataManager.js";
import { TaskModel } from "../models/taskModel.js";
import { isUserAuth } from "../firebase/fb";
// Check auth status and redirect listener
isUserAuth();
// Enable transition onLoad
window.addEventListener("load", () => {
  document.querySelector("body").classList.remove("preload");
  console.log("Welcome to Jigmu!");
  console.log("Developer: Jay JW Seo");
  console.log("Find me @ https://me.jayjwseo.com");
});
// Selectors
const ctaNewTaskButton = document.querySelector("#cta-new-task-btn");
// CTA add new task & redirect
ctaNewTaskButton.addEventListener("click", () => {
  const ctaNewTaskTitle = document.querySelector("#cta-new-task-input").value;
  if (ctaNewTaskTitle) {
    const firstList = jData.board[0];
    const ctaNewTask = new TaskModel(
      ctaNewTaskTitle,
      "",
      "",
      "",
      "",
      `${firstList.title}`
    );
    firstList.taskCardSet.push(ctaNewTask);
    saveCanvas();
  }
});
// CTA bar observer
const ctaBar = document.querySelector(".ctaBar");
const observer = new IntersectionObserver(
  // Add .isSticky if not 100% visible
  ([e]) => e.target.classList.toggle("isSticky", e.intersectionRatio < 1),
  // Run call back if not 100% visible
  { threshold: [1] }
);
// Observe CTA bar
observer.observe(ctaBar);
