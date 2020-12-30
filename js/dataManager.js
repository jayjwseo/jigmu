import { v4 as uuidV4 } from "../node_modules/uuid/dist/esm-browser/index.js";
// KEYS
const LOCAL_STORAGE_PREFIX = "JKBOARD_BOARD_CANVAS";
const DATA_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-DATA`;
// Data
let jData = loadCanvas();
// Load Data
function loadCanvas() {
  const dataString = localStorage.getItem(DATA_STORAGE_KEY);
  return (
    JSON.parse(dataString) || {
      // DEFAULT_TEMPLATE
      board: [
        {
          title: "TO DO",
          id: uuidV4(),
          taskCardSet: [
            {
              title: "Example Task",
              desc: "Click this task card to edit",
              member: "JK Board",
              date: "2030-01-01",
              tag: "Blue",
              status: "TO DO",
              id: uuidV4(),
            },
          ],
        },
        {
          title: "IN PROGRESS",
          id: uuidV4(),
          taskCardSet: [],
        },
        { title: "REVIEW", id: uuidV4(), taskCardSet: [] },
        { title: "DONE", id: uuidV4(), taskCardSet: [] },
      ],
    }
  );
}
// Save data
function saveCanvas() {
  localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(jData));
}
// Export
export { jData, loadCanvas, saveCanvas };
