import { v4 as uuidV4 } from "uuid";
// Templates
const defaultTemplate = {
  board: [
    {
      title: "TO DO",
      id: uuidV4(),
      taskCardSet: [
        {
          title: "Example Task",
          desc: "Click this task card to edit",
          member: "Jigmu",
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
    { title: "DONE", id: uuidV4(), taskCardSet: [] },
  ],
};
// Sample Data
const sampleData = {
  board: [
    {
      title: "TO DO",
      id: uuidV4(),
      taskCardSet: [
        {
          title: "Deployment Plan",
          desc: "",
          member: "Dev Team",
          date: "2021-06-03",
          tag: "Blue",
          status: "TO DO",
          id: uuidV4(),
        },
        {
          title: "Testing & QA",
          desc: "",
          member: "Tester",
          date: "",
          tag: "Red",
          status: "TO DO",
          id: uuidV4(),
        },
        {
          title: "Legal Issues",
          desc: "Terms of Use and Privacy Policy",
          member: "Legal Dept.",
          date: "",
          tag: "Green",
          status: "TO DO",
          id: uuidV4(),
        },
        {
          title: "CMS Integration",
          desc: "",
          member: "Dev Team",
          date: "2021-04-30",
          tag: "Blue",
          status: "TO DO",
          id: uuidV4(),
        },
        {
          title: "Marketing Plan",
          desc: "",
          member: "Marketing Dept",
          date: "",
          tag: "Yellow",
          status: "TO DO",
          id: uuidV4(),
        },
      ],
    },
    {
      title: "IN PROGRESS",
      id: uuidV4(),
      taskCardSet: [
        {
          title: "Core Module Development",
          desc: "Data structure and core modules",
          member: "Jay JW SEO",
          date: "2021-03-04",
          tag: "Blue",
          status: "IN PROGRESS",
          id: uuidV4(),
        },
        {
          title: "BUG FIX",
          desc: "URGENT!",
          member: "",
          date: "2021-01-08",
          tag: "Red",
          status: "IN PROGRESS",
          id: uuidV4(),
        },
        {
          title: "Prototyping",
          desc: "Intuitive project management board",
          member: "Digital Dept.",
          date: "2021-02-01",
          tag: "Gray",
          status: "IN PROGRESS",
          id: uuidV4(),
        },
      ],
    },
    {
      title: "REVIEW",
      id: uuidV4(),
      taskCardSet: [
        {
          title: "User Experience Research",
          desc: "Landing page and board canvas",
          member: "Design Team",
          date: "",
          tag: "Gray",
          status: "REVIEW",
          id: uuidV4(),
        },
        {
          title: "Project Management Plan",
          desc: "Use Jigmu Board & Scrum",
          member: "Project Manager",
          date: "2020-12-31",
          tag: "Green",
          status: "REVIEW",
          id: uuidV4(),
        },
      ],
    },
    {
      title: "DONE",
      id: uuidV4(),
      taskCardSet: [
        {
          title: "Market Studies",
          desc: "",
          member: "Business & Marketing",
          date: "",
          tag: "Yellow",
          status: "DONE",
          id: uuidV4(),
        },
        {
          title: "Project proposal",
          desc: "",
          member: "Digital Dept.",
          date: "",
          tag: "Gray",
          status: "DONE",
          id: uuidV4(),
        },
        {
          title: "Feasibility Study",
          desc: "",
          member: "Business Dept.",
          date: "",
          tag: "Green",
          status: "DONE",
          id: uuidV4(),
        },
        {
          title: "General Meeting",
          desc:
            "Project scope - define features and functions of Jigmu Board. Also discuss the core modules to be developed.",
          member: "",
          date: "",
          tag: "Blue",
          status: "DONE",
          id: uuidV4(),
        },
      ],
    },
  ],
};

export { defaultTemplate, sampleData };
