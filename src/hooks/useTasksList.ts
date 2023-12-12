import { useCallback, useEffect, useReducer } from "react";
import {
  TasksListAction,
  TasksListActionType,
  TasksListState,
  SortTypes,
  TaskStoreData,
  TasksStoreListState,
} from "./types";
import { TaskData } from "@/components/Task/types";

function TaskListReducer(state: TasksListState, action: TasksListAction) {
  var newState;
  switch (action.type) {
    case TasksListActionType.add:
      newState = {
        list: [...state.list, { ...action.task, id: state.nextid }],
        nextid: state.nextid + 1,
      };
      return newState;

    case TasksListActionType.update:
      newState = {
        list: state.list.map((task) => {
          if (task.id === action.task.id) {
            return action.task;
          } else {
            return task;
          }
        }),
        nextid: state.nextid,
      };
      return newState;

    case TasksListActionType.done:
      newState = {
        list: state.list.filter((task) => task.id !== action.id),
        nextid: state.nextid,
      };
      return newState;
    case TasksListActionType.sort:
      switch (action.sorttype) {
        case SortTypes.name:
          return {
            list: state.list
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name)),
            nextid: state.nextid,
          }; //smaller - bigger = negative
        case SortTypes.date:
          return {
            list: state.list
              .slice()
              .sort(
                (a, b) => a.create_date.getTime() - b.create_date.getTime()
              ),
            nextid: state.nextid,
          }; //smaller - bigger = negative
        case SortTypes.priority:
          return {
            list: state.list.slice().sort((a, b) => b.priority - a.priority),
            nextid: state.nextid,
          };
        default:
          return state;
      }

    default:
      return state;
  }
}

export function useTasksList() {
  const storedStateString = localStorage.getItem("tasks");
  const storedState: TasksStoreListState = storedStateString
    ? JSON.parse(storedStateString)
    : {
        list: [],
        nextId: 0,
      };
  const taskList: TaskData[] = storedState.list.map((item) => {
    return { ...item, create_date: new Date(item.create_date) };
  });
  const state: TasksListState = {
    nextid: storedState.nextid,
    list: taskList,
  };

  const [tasksList, taskListdispatch] = useReducer(
    TaskListReducer,
    state as TasksListState
  );

  const addTask = useCallback((task: TaskData): void => {
    taskListdispatch({ type: TasksListActionType.add, task: task });
  }, []);

  const updateTask = useCallback((task: TaskData): void => {
    taskListdispatch({ type: TasksListActionType.update, task: task });
  }, []);

  const doneTask = useCallback((id: number): void => {
    taskListdispatch({ type: TasksListActionType.done, id: id });
  }, []);

  const sortTasks = useCallback((sorttype: SortTypes): void => {
    taskListdispatch({ type: TasksListActionType.sort, sorttype: sorttype });
  }, []);

  useEffect(() => {
    let taksStoreList: TaskStoreData[] = tasksList.list.map((item) => {
      return { ...item, create_date: item.create_date.toString() };
    });

    let tasksStore: TasksStoreListState = {
      nextid: tasksList.nextid,
      list: taksStoreList,
    };
    localStorage.setItem("tasks", JSON.stringify(tasksStore));
  }, [tasksList]);

  return {
    taskslist: tasksList.list.slice(0, 10),
    count: tasksList.list.length,
    taskListdispatch,
    addTask,
    updateTask,
    doneTask,
    sortTasks,
  };
}
