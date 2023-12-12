import React, { memo, useLayoutEffect, useState } from "react";
import { TaskDataProps } from "./types";
import { ViewType } from "../Main/types";

function Task({
  id,
  name,
  description,
  priority,
  create_date,
  doneTask,
  chooseTask,
  changeView,
}: TaskDataProps) {
  function onDoneClick(event: React.MouseEvent<HTMLButtonElement>) {
    console.log(name);
    doneTask(id);
  }
  function onViewClick(event: React.MouseEvent<HTMLButtonElement>) {
    console.log(id);
    event.stopPropagation();
    chooseTask(() => {
      return {
        id,
        name,
        description,
        priority,
        create_date,
      };
    });
    changeView(() => {
      return ViewType.updateForm;
    });
  }

  const [priorityColor, setPriorityColor] = useState<string>("bg-blue-600");
  const [proirityWidth, setPriorityWidth] = useState<string>("w-1/5");

  useLayoutEffect(() => {
    switch (priority) {
      case 1:
        setPriorityWidth("w-1/5");
        setPriorityColor("bg-blue-600");
        break;

      case 2:
        setPriorityWidth("w-2/5");
        setPriorityColor("bg-sky-600");
        break;

      case 3:
        setPriorityWidth("w-3/5");
        setPriorityColor("bg-lime-600");
        break;

      case 4:
        setPriorityWidth("w-4/5");
        setPriorityColor("bg-yellow-600");
        break;

      case 5:
        setPriorityWidth("w-5/5");
        setPriorityColor("bg-red-600");
        break;

      default:
        setPriorityWidth("w-1/5");
        setPriorityColor("bg-blue-600");
        break;
    }
  }, [priority]);

  return (
    <div className="m-2 border-2 border-gray-100 bg-gray-50 rounded-lg shadow-md flex flex-row justify-between h-60 ">
      <div className="w-9/12 flex flex-col justify-between">
        <div className="w-full">
          <h1 className="text-5xl px-2 my-2 text-gray-900">{name}</h1>
          <p className="text-lg px-2 my-2 text-ellipsis overflow-hidden h-20 text-gray-700">
            {description}
          </p>
        </div>
        <div className="flex flex-col">
          <div className="px-2 my-2">
            <span className="text-gray-500 text-sm ">priority</span>
            <div className="w-2/5 w bg-gray-200 rounded-full h-2.5 ">
              <div
                className={`${priorityColor} ${proirityWidth} h-2.5 rounded-full`}
              ></div>
            </div>
          </div>
          <span className="text-gray-500 text-sm px-2 my-2">
            {`${create_date.toString().slice(0, 25)}`}
          </span>
        </div>
      </div>
      <div className="flex flex-row mx-2 justify-center items-center ">
        <button
          className="mx-2 text-white bg-sky-600 hover:bg-sky-700 focus:ring-2 focus:outline-none h-16
          focus:ring-sky-200 font-medium rounded-lg text-md px-5 py-2.5 w-24 text-center justify-center items-center"
          onClick={onViewClick}
        >
          view
        </button>
        <button
          className="mx-2 text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:outline-none h-16
        focus:ring-green-200 font-medium rounded-lg text-md px-5 py-2.5 w-24 text-center justify-center items-center"
          onClick={onDoneClick}
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default memo(Task);
