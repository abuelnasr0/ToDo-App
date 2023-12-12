import { taskpriority } from "../Task/types";
import { FormProps, FormTypes } from "./types";
import React, { memo, useEffect, useState } from "react";

function Form({ type, currentTask, addOrUpdateTask, resetView }: FormProps) {
  const [name, setName] = useState<string>(currentTask ? currentTask.name : "");
  const [description, setDiscription] = useState<string>(
    currentTask ? currentTask.description : ""
  );
  const [priority, setPriority] = useState<taskpriority>(
    currentTask ? currentTask.priority : 1
  );

  useEffect(() => {
    if (currentTask) {
      setName(currentTask.name);
      setDiscription(currentTask.description);
      setPriority(currentTask.priority);
    }
  }, [currentTask]);

  function handlePriorityChange(e: React.ChangeEvent<HTMLInputElement>) {
    let n = Number(e.target.value);
    switch (n) {
      case 1:
        setPriority(1);
        break;
      case 2:
        setPriority(2);
        break;
      case 3:
        setPriority(3);
        break;
      case 4:
        setPriority(4);
        break;
      case 5:
        setPriority(5);
        break;
      default:
        setPriority(1);
        break;
    }
  }

  function addTaskf(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addOrUpdateTask({
      id: currentTask ? currentTask.id : 0,
      name,
      description,
      priority,
      create_date: currentTask ? currentTask.create_date : new Date(),
    });
    resetView();
  }
  return (
    <div className="z-10 w-screen h-screen fixed bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <form
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        className="bg-white w-1/2 h-3/5 rounded-lg flex flex-col justify-around p-5"
        onSubmit={addTaskf}
      >
        <div>
          <label className="block text-gray-700 text-2xl font-bold mb-2 px-2">
            Task Name
          </label>
          <input
            className="shadow appearance-none border rounded w-2/5 py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-2 text-lg"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="h-1/2 mt-4">
          <label className="block text-gray-700 text-2xl font-bold mb-2 px-2">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-11/12 h-5/6 py-2 px-1 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline mx-2 text-lg"
            name="description"
            value={description}
            onChange={(e) => setDiscription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 text-2xl font-bold mb-2 px-2">
            Priority
          </label>
          <div className="w-3/12 flex flex-row justify-center items-center">
            <input
              className=" mx-2 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              type="range"
              min="0"
              max="5"
              name="priority"
              value={priority}
              onChange={handlePriorityChange}
            />
            <span className="text-xl text-gray-600 px-2">{priority}</span>
          </div>
        </div>
        <div className="flex items-end justify-end">
          <input
            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none cursor-pointer
          focus:ring-green-200 font-medium rounded-lg text-lg px-5 py-2.5 m-2 w-34 text-center inline-flex items-center"
            type="submit"
            value={type === FormTypes.add ? "Add" : "Update"}
          />
        </div>
      </form>
    </div>
  );
}

export default memo(Form);
