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
      //DEFAULT_TEMPLATE
      board: [
        {
          title: "list1",
          id: "1",
          taskCardSet: [],
        },
        {
          title: "list2",
          id: "2",
          taskCardSet: [],
        },
        { title: "list3", id: "3", taskCardSet: [] },
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
