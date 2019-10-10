import {CdkDropList} from "@angular/cdk/drag-drop";
import {Project} from "../model/project";
import {Stage} from "../model/stage";
import {Task} from "../model/task";

export interface Validation {
  (prev:CdkDropList,prevStageIndex:number,prevIndex:number,curr:CdkDropList,currStageIndex:number,currIndex:number,project:Project,stage:Stage,task:Task):boolean;
}
