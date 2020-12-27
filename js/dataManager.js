// Local Storage Keys
const LOCAL_STORAGE_PREFIX = "JKBOARD_BOARD_CANVAS";
const TASK_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-TASK`;
// Data Object
let jData = {
  taskCardsSet: loadCanvas(),
};

//Get saved data as an array
function loadCanvas() {
  const dataString = localStorage.getItem(TASK_STORAGE_KEY);
  //Empty array if data not present
  return JSON.parse(dataString) || [];
}

//Save on local storage
function saveCanvas() {
  localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(jData.taskCardsSet));
}

export { jData, loadCanvas, saveCanvas };
