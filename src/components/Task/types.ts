import { ViewType } from "../Main/types";

export type taskpriority = 1 | 2 | 3 | 4 | 5;

export type TaskData = {
  id: number;
  name: string;
  description: string;
  priority: taskpriority;
  create_date: Date;
};
export type DoneTaskFunction = { doneTask: (id: number) => void };
export type ChooseTaskFunction = {
  chooseTask: React.Dispatch<React.SetStateAction<TaskData | undefined>>;
};

export type ChnageViewFunction = {
  changeView: React.Dispatch<React.SetStateAction<ViewType>>;
};

export type TaskDataProps = TaskData &
  DoneTaskFunction &
  ChooseTaskFunction &
  ChnageViewFunction;
