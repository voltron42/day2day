import {Component, OnInit} from '@angular/core';
import {ProjectsService} from "../projects.service";
import {Project} from "../model/project";
import {Stage} from "../model/stage";
import {Task} from "../model/task";
import {STATES} from "../const/states";
import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Validator} from "../validation/validator";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'task-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  private projectNames: string[];

  private selectedProject:Project;

  private validator: Validator = new Validator();

  public newTaskForm: FormGroup = this.fb.group({
    newTaskName:[''],
    newTaskDate:[''],
    newTaskBlocker:[''],
  });

  constructor(private ps: ProjectsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.ps.listProjects().subscribe((list) => {
      this.projectNames = list;
      if (list.length > 0) {
        this.ps.getProject(0).subscribe((p) => {
          this.selectedProject = p;
        });
      }
    });
  }

  selectProject(event) {
    let index = event.target.value;
    this.ps.getProject(index).subscribe((p) => this.selectedProject = p);
  }

  getButtonState(stageIndex: number, stage: Stage, task: Task) {
    let now = new Date();
    let state = "";
    if (stageIndex == this.selectedProject.stages.length - 1) {
      if (task.blocker != null) {
        state = "abandoned";
      } else {
        state = "completed";
      }
    } else if (task.date != null && (task.date < now)) {
      state = "overdue";
    } else if (task.blocker != null) {
      state = "blocked";
    }
    return STATES[state];
  }

  isValid(prev:CdkDropList,prevIndex:number,curr:CdkDropList,currIndex:number):boolean {
    return this.validator.isValid(prev,prevIndex,curr,currIndex,this.selectedProject);
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (this.isValid(event.previousContainer,event.previousIndex,event.container,event.currentIndex)) {
        transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
      }
    }
    this.ps.save();
  }

  showProjectList(event) {
    event.preventDefault();
    console.log("projects list");
  }

  logout(event) {
    event.preventDefault();
    console.log("logout");
  }

  editTask(stageIndex,taskIndex,task) {
    console.log(stageIndex+", "+taskIndex+", "+task.name)
  }

  newTaskCreator() {
    let me = this;
    return function() {
      console.log("creating new task");
      let value = me.newTaskForm.value;
      let task = new Task();
      task.name = value["newTaskName"].trim();
      if (task.name.length > 0) {
        if (value["newTaskDate"]) {
          task.date = value["newTaskDate"]
        }
        if (value["newTaskBlocker"]) {
          task.blocker = value["newTaskBlocker"]
        }
        me.selectedProject.stages[0].tasks.push(task);
      }
      console.log("new task created")
    }
  }
}
