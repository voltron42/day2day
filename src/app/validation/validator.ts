import {CdkDropList} from "@angular/cdk/drag-drop";
import {Project} from "../model/project";
import {VALIDATIONS} from "./validations";

export class Validator {

  private getStageIndex(container:CdkDropList):number {
    let idParts = container._dropListRef.id.split("-");
    return parseInt(idParts[idParts.length-1]);
  }

  public isValid(prev:CdkDropList,prevIndex:number,curr:CdkDropList,currIndex:number,project:Project):boolean {
    let prevStageIndex = this.getStageIndex(prev);
    let currStageIndex = this.getStageIndex(curr);
    let stage = project.stages[prevStageIndex];
    let task = stage.tasks[prevIndex];
    for (let i = 0; i < VALIDATIONS.length; i++) {
      if (VALIDATIONS[i](prev,prevStageIndex,prevIndex,curr,currStageIndex,currIndex,project,stage,task)) {
        return true;
      }
    }
    return false;
  }
}
