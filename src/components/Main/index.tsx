import React, { useState, memo } from "react";
import { TaskData } from "../Task/types";
import { SortTypes } from "../../hooks/types";
import Task from "../Task";
import Form from "../Form";
import { useTasksList } from "../../hooks/useTasksList";
import { FormTypes } from "../Form/types";
import { ViewType } from "./types";

function Main() {
  const { taskslist, count, addTask, updateTask, doneTask, sortTasks } =
    useTasksList();

  const [view, setView] = useState<ViewType>(ViewType.NoForm);
  const [currentTask, setCurrentTask] = useState<TaskData | undefined>(
    undefined
  );

  const [sortDropDown, setSortDropDown] = useState<boolean>(false);
  const toggleSortDropDown = () => {
    setSortDropDown((o) => !o);
  };
  const hideSortDropDown = () => {
    setSortDropDown(() => false);
  };

  const resetView = () => {
    setView(ViewType.NoForm);
  };

  return (
    <div
      onMouseDown={(e) => {
        hideSortDropDown();
        resetView();
      }}
      className="w-full h-full flex flex-col items-center"
    >
      <div className="w-7/12 h-16 text-lg font-sans flex flex-row justify-center items-center ">
        <div className="mx-2 text-xl text-gray-800 ">
          {count === 0
            ? "No tasks yet"
            : `You have ${count} ${count === 1 ? "task" : "tasks"}`}
        </div>
        <button
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none
        focus:ring-green-600 font-medium rounded-lg text-lg px-5 py-2.5 m-2 w-34 text-center inline-flex items-center"
          onClick={() => {
            setView(ViewType.AddForm);
          }}
        >
          Add Task
          <svg
            className="w-4 h-4 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
        <div>
          <button
            className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none 
          focus:ring-gray-200 font-medium rounded-lg text-lg px-5 py-2.5 m-2 w-34 text-center inline-flex items-center"
            onMouseDown={(e) => {
              e.stopPropagation();
              toggleSortDropDown();
            }}
          >
            Sort By
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            className={`absolute top-14 ${
              sortDropDown ? "" : "hidden"
            } rounded-lg w-40`}
          >
            <ul className="p-2 text-base text-gray-900">
              <li
                className="block px-2 py-2 bg-gray-100 hover:bg-gray-200  cursor-pointer"
                onClick={() => {
                  sortTasks(SortTypes.name);
                }}
              >
                sort by name
              </li>
              <li
                className="block px-2 py-2 bg-gray-100 hover:bg-gray-200  cursor-pointer"
                onClick={() => {
                  sortTasks(SortTypes.date);
                }}
              >
                sort by date
              </li>
              <li
                className="block px-2 py-2 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  sortTasks(SortTypes.priority);
                }}
              >
                sort by priority
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-7/12 ">
        {taskslist.map((atask) => {
          return (
            <Task
              key={atask.id}
              {...atask}
              doneTask={doneTask}
              chooseTask={setCurrentTask}
              changeView={setView}
            />
          );
        })}
      </div>
      {view !== ViewType.NoForm ? (
        view === ViewType.AddForm ? (
          <Form
            key={FormTypes.add}
            type={FormTypes.add}
            addOrUpdateTask={addTask}
            resetView={resetView}
          />
        ) : (
          <Form
            key={FormTypes.update}
            type={FormTypes.update}
            currentTask={currentTask}
            addOrUpdateTask={updateTask}
            resetView={resetView}
          />
        )
      ) : (
        <></>
      )}
    </div>
  );
}

export default memo(Main);
