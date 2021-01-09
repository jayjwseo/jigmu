import { defaultTemplate, sampleData } from "../utils/boardTemplates.js";
// KEYS
const LOCAL_STORAGE_PREFIX = "JKBOARD_BOARD_CANVAS";
const DATA_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-DATA`;
// Data
let jData = loadCanvas();
// Load Data
function loadCanvas() {
  const dataString = localStorage.getItem(DATA_STORAGE_KEY);
  return JSON.parse(dataString) || defaultTemplate;
}
// Save data
function saveCanvas() {
  localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(jData));
}
// Export
export { jData, loadCanvas, saveCanvas };
