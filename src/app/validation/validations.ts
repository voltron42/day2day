import {Validation} from "./validation";

export const VALIDATIONS:Validation[] = [
  (prev,prevStageIndex,prevIndex,curr,currStageIndex,currIndex,proj,stage,task) => {
    return (currStageIndex < prevStageIndex);
  },
  (prev,prevStageIndex,prevIndex,curr,currStageIndex,currIndex,proj,stage,task) => {
    return (currStageIndex == proj.stages.length - 1);
  },
  (prev,prevStageIndex,prevIndex,curr,currStageIndex,currIndex,proj,stage,task) => {
    return (currStageIndex - prevStageIndex == 1) && (task.blocker == null);
  },
];
