import { TaskData, taskpriority } from "../components/Task/types";
export type TasksListState = {
  list: TaskData[];
  nextid: number;
};

export type TaskStoreData = {
  id: number;
  name: string;
  description: string;
  priority: taskpriority;
  create_date: string;
};

export type TasksStoreListState = {
  list: TaskStoreData[];
  nextid: number;
};

export enum TasksListActionType {
  add,
  update,
  done,
  sort,
}

type DoneTask = {
  type: TasksListActionType.done;
  id: number;
};

type AddTask = {
  type: TasksListActionType.add;
  task: TaskData;
};

type UpdateTask = {
  type: TasksListActionType.update;
  task: TaskData;
};

export enum SortTypes {
  name,
  date,
  priority,
}

type SortTasksList = {
  type: TasksListActionType.sort;
  sorttype: SortTypes;
};

export type TasksListAction = DoneTask | AddTask | UpdateTask | SortTasksList;
