import { v4 as uuidV4 } from "uuid";
import { jData, saveCanvas } from "../services/dataManager.js";
import {
  renderUpdateTaskCard,
  renderNewTaskCard,
} from "../services/boardRender.js";
// Task model
class TaskModel {
  constructor(title, desc, member, date, tag, status) {
    this.title = title;
    this.desc = desc;
    this.member = member;
    this.date = date;
    this.tag = tag;
    this.status = status;
    this.checklist = [];
    this.id = uuidV4();
  }
  // Add task card
  static addTaskCard(title, status, listEle, listObj) {
    const newTaskCard = new TaskModel(title, "", "", "", "", status);
    listObj.taskCardSet.push(newTaskCard);
    renderNewTaskCard(newTaskCard, listEle, jData);
    return newTaskCard;
  }
  // Update status
  static updateStatus(task, currentListObj, toListObj, toListEle, taskCard) {
    task.status = toListObj.title;
    currentListObj.taskCardSet.splice(
      currentListObj.taskCardSet.indexOf(task),
      1
    );
    toListObj.taskCardSet.splice(toListObj.taskCardSet.length, 0, task);
    taskCard.remove();
    renderNewTaskCard(task, toListEle, jData);
    saveCanvas();
  }
  // Update task Card
  static updateTaskCard(
    selectedTaskCardListObj,
    selectedTaskCardObj,
    selectedTaskCardElement,
    title,
    desc,
    member,
    date,
    tag,
    status
  ) {
    // Status change?
    const statusChange = selectedTaskCardObj.status === status ? false : true;
    selectedTaskCardObj.title = title;
    selectedTaskCardObj.desc = desc;
    selectedTaskCardObj.member = member;
    selectedTaskCardObj.date = date;
    selectedTaskCardObj.tag = tag;
    selectedTaskCardObj.status = status;
    if (statusChange) {
      const listObj = jData.board.find((list) => list.title === status);
      const listId = listObj.id;
      const listEle = document.querySelector(`[data-list-id="${listId}"]`);
      selectedTaskCardListObj.taskCardSet.splice(
        selectedTaskCardListObj.taskCardSet.indexOf(selectedTaskCardObj),
        1
      );
      listObj.taskCardSet.splice(
        listObj.taskCardSet.length,
        0,
        selectedTaskCardObj
      );
      selectedTaskCardElement.remove();
      renderNewTaskCard(selectedTaskCardObj, listEle, jData);
    } else {
      renderUpdateTaskCard(selectedTaskCardObj, selectedTaskCardElement, jData);
    }
  }
  // Delete task card
  static deleteTaskCard(selectedTaskCardListObj, selectedTaskCardObj) {
    selectedTaskCardListObj.taskCardSet = selectedTaskCardListObj.taskCardSet.filter(
      (task) => task.id !== selectedTaskCardObj.id
    );
  }
}
// Export
export { TaskModel };
