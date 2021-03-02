import { v4 as uuidV4 } from "uuid";
// import { jData, saveCanvas } from "../services/dataManager.js";
import {
  clearBoard,
  renderData,
  renderNewList,
} from "../services/boardRender.js";
// List model
class ListModel {
  constructor(title) {
    this.title = title;
    this.id = uuidV4();
    this.taskCardSet = [];
  }
  // Add list
  static addList(addListTitle, addListSection, jData) {
    const newList = new ListModel(addListTitle);
    jData.board.push(Object.assign({}, newList));
    addListSection.remove();
    // renderNewList(newList, jData);
    // saveCanvas();
  }
  // Change order
  static changeOrder(currentListObj, toOrder, jData) {
    jData.board.splice(jData.board.indexOf(currentListObj), 1);
    jData.board.splice(toOrder, 0, currentListObj);
    // clearBoard();
    // renderData(jData);
    // saveCanvas();
  }
  // Delete list
  static deleteList(currentListObj, jData) {
    jData.board.splice(jData.board.indexOf(currentListObj), 1);
    // clearBoard();
    // renderData(jData);
    // saveCanvas();
  }
}
// Export
export { ListModel };
