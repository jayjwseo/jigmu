// Task List constructor
class TaskList {
  constructor(title) {
    this.title = title;
    this.id = new Date().valueOf().toString();
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
    this.id = new Date().valueOf().toString();
  }
}
// Export
export { TaskList, TaskCard };
