// Task card constructor
class TaskManager {
  constructor(title, desc, member, date, tag, status) {
    this.title = title;
    this.desc = desc;
    this.member = member;
    this.date = date;
    this.tag = tag;
    this.status = status;
    this.id = new Date().valueOf().toString();
  }

  askMagicEight() {
    const i = [
      "Brilliant Task! :)",
      "A Piece of Cake! :)",
      "That Task Looks Hard :(",
      "Achievable Task! :)",
      "Am I a class function?",
      "Am I correctly defined?",
      "Look at those dummy lists... this developer must be a dummy.",
      "Don't frown! This is just an easter egg! ;)",
    ];
    console.log(i[Math.floor(Math.random() * 8)]);
  }
}
