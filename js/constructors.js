import { v4 as uuidV4 } from "../node_modules/uuid/dist/esm-browser/index.js";
// Task List constructor
class TaskList {
  constructor(title) {
    this.title = title;
    this.id = uuidV4();
    this.taskCardSet = [];
  }
}
// Task card constructor
class TaskCard {
  constructor(title, desc, member, date, tag, status) {
    this.title = title;
    this.desc = desc;
    this.member = member;
    this.date = date;
    this.tag = tag;
    this.status = status;
    this.id = uuidV4();
  }
}
// Export
export { TaskList, TaskCard };
