import {Project} from "../model/project";

export const MOCK_DATA: Project[] = (function(){
  let now = new Date();
  now.setFullYear(now.getFullYear()-1);
  return [{
    name: "Project 1",
    stages: [{
      name: "TODO",
      tasks: [{
        name: "Overdue Task",
        date: now,
        state: "",
        blocker: null
      }, {
        name: "Ready Task",
        date: null,
        state: "",
        blocker: null
      }, {
        name: "Blocked Task",
        date: null,
        state: "",
        blocker: "Overdue Task"
      }],
    }, {
      name: "In Progress",
      tasks: [{
        name: "Task In Progress",
        date: null,
        state: "",
        blocker: null
      }, {
        name: "Overdue Task In Progress",
        date: now,
        state: "",
        blocker: null
      }],
    }, {
      name: "Complete",
      tasks: [{
        name: "Completed Task",
        date: null,
        state: "completed",
        blocker: null
      }, {
        name: "Abandoned Task",
        date: null,
        state: "abandoned",
        blocker: "Ready Task"
      }],
    }],
  },{
    name: "Project 2",
    stages: []
  },{
    name: "Project 3",
    stages: []
  },{
    name: "Project 4",
    stages: []
  }];
})();
