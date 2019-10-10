import { Injectable } from '@angular/core';
import {Project} from "./model/project";
import {Observable, of} from "rxjs";
import {MOCK_DATA} from "./const/mockdata";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private projects: Project[];

  constructor() {
    this.projects = JSON.parse(localStorage.getItem("projects"));
    if (this.projects == null) {
      this.projects = MOCK_DATA;
      this.save();
    } else {
      for (let x = 0; x < this.projects.length; x++) {
        let project = this.projects[x];
        for (let y = 0; y < project.stages.length; y++) {
          let stage = project.stages[y];
          for (let z = 0; z < stage.tasks.length; z++) {
            let task = stage.tasks[z];
            if (task.date != null) {
              task.date = new Date(task.date);
            }
          }
        }
      }
    }
  }

  public save() {
    localStorage.setItem("projects",JSON.stringify(this.projects));
  }

  public listProjects():Observable<string[]> {
    return of(this.projects.map((p) => p.name));
  }

  public getProject(index: number):Observable<Project> {
    return of(this.projects[index]);
  }
}
