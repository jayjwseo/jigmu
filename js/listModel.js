import { v4 as uuidV4 } from "../node_modules/uuid/dist/esm-browser/index.js";
import { jData, saveCanvas } from "./dataManager.js";
import { clearBoard, renderData, renderNewList } from "./boardRender.js";
// List model
class ListModel {
  constructor(title) {
    this.title = title;
    this.id = uuidV4();
    this.taskCardSet = [];
  }
  // Add list
  static addList(addListTitle, addListSection) {
    const newList = new ListModel(addListTitle);
    jData.board.push(newList);
    addListSection.remove();
    renderNewList(newList, jData);
    saveCanvas();
  }
  // Change order
  static changeOrder(currentListObj, toOrder) {
    jData.board.splice(jData.board.indexOf(currentListObj), 1);
    jData.board.splice(toOrder, 0, currentListObj);
    clearBoard();
    renderData(jData);
    saveCanvas();
  }
  // Delete list
  static deleteList(currentListObj) {
    jData.board.splice(jData.board.indexOf(currentListObj), 1);
    clearBoard();
    renderData(jData);
    saveCanvas();
  }
}
// Export
export { ListModel };
