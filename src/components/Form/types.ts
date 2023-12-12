import { TaskData } from "../Task/types";

export enum FormTypes {
  add,
  update,
}

// export type UpdateTaskFunction = { updateTask: (task: TaskData) => void }/
export type AddOrUpdateTaskFunction = {
  addOrUpdateTask: (task: TaskData) => void;
};

export type ResetViewFunction = {
  resetView: () => void;
};

export type FormProps = {
  type: FormTypes;
  currentTask?: TaskData;
} & AddOrUpdateTaskFunction &
  ResetViewFunction;
