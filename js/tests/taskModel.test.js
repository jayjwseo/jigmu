import { TaskModel } from "../models/taskModel";
import {
  renderUpdateTaskCard,
  renderNewTaskCard,
} from "../services/boardRender";
jest.mock("../services/boardRender");
jest.mock("../services/dataManager", () => ({
  jData: { board: [{ title: "statusUpdate", taskCardSet: [] }] },
}));

describe("TaskModel", () => {
  beforeEach(() => {
    renderUpdateTaskCard.mockClear();
    renderNewTaskCard.mockClear();
  });
  it("should add task", () => {
    renderNewTaskCard.mockImplementation(() => {
      return {
        mock: () => {},
      };
    });
    const listObj = { taskCardSet: [] };
    const listEle = document.createElement("div");
    const result = TaskModel.addTaskCard("title", "status", listEle, listObj);
    expect(result).toMatchObject({ title: "title", status: "status" });
    expect(listObj.taskCardSet.length).toBeGreaterThan(0);
  });
  it("should update task with status update", () => {
    renderUpdateTaskCard.mockImplementation(() => {
      return {
        mock: () => {},
      };
    });
    renderNewTaskCard.mockImplementation(() => {
      return {
        mock: () => {},
      };
    });
    const selectedTaskCardObj = {
      title: "title",
      desc: "desc",
      member: "member",
      date: "date",
      tag: "tag",
      status: "status",
    };
    const selectedTaskCardListObj = {
      taskCardSet: [selectedTaskCardObj],
    };
    const selectedTaskCardElement = document.createElement("div");
    TaskModel.updateTaskCard(
      selectedTaskCardListObj,
      selectedTaskCardObj,
      selectedTaskCardElement,
      "titleUpdate",
      "descUpdate",
      "memberUpdate",
      "dateUpdate",
      "tagUpdate",
      "statusUpdate"
    );
    expect(selectedTaskCardObj).toEqual({
      title: "titleUpdate",
      desc: "descUpdate",
      member: "memberUpdate",
      date: "dateUpdate",
      tag: "tagUpdate",
      status: "statusUpdate",
    });
  });
  it("should update task without status update", () => {
    renderUpdateTaskCard.mockImplementation(() => {
      return {
        mock: () => {},
      };
    });
    renderNewTaskCard.mockImplementation(() => {
      return {
        mock: () => {},
      };
    });
    const selectedTaskCardObj = {
      title: "title",
      desc: "desc",
      member: "member",
      date: "date",
      tag: "tag",
      status: "status",
    };
    const selectedTaskCardListObj = {
      taskCardSet: [selectedTaskCardObj],
    };
    const selectedTaskCardElement = document.createElement("div");
    TaskModel.updateTaskCard(
      selectedTaskCardListObj,
      selectedTaskCardObj,
      selectedTaskCardElement,
      "titleUpdate",
      "descUpdate",
      "memberUpdate",
      "dateUpdate",
      "tagUpdate",
      "status"
    );
    expect(selectedTaskCardObj).toEqual({
      title: "titleUpdate",
      desc: "descUpdate",
      member: "memberUpdate",
      date: "dateUpdate",
      tag: "tagUpdate",
      status: "status",
    });
  });
  it("should delete task", () => {
    const selectedTaskCardObj = { id: 2 };
    const selectedTaskCardListObj = {
      taskCardSet: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };
    TaskModel.deleteTaskCard(selectedTaskCardListObj, selectedTaskCardObj);
    expect(selectedTaskCardListObj.taskCardSet).toEqual([{ id: 1 }, { id: 3 }]);
  });
});
