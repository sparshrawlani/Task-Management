import React, { useEffect, useState } from "react";
import { Group, ListType, RepeatType, TodoType } from "../types";
import { useTodo } from "./TodoProvider";

export const AddTodo: React.FC<{ nameParam: string | undefined }> = ({
  nameParam,
}) => {
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newDueDate, setNewDueDate] = useState<Date | undefined>(undefined);
  const [newRemindme, setRemindme] = useState<Date | undefined>(undefined);
  const [selectedRepeatType, setSelectedRepeatType] = useState<RepeatType | undefined>(undefined);
  const [status, setStatus] = useState<boolean>(false); // **1. Added state for status (completed or not)**
  const { groups, setGroups } = useTodo();
  const repeatTypes = ["Daily", "WeekDays", "Weekly", "Monthly", "Yearly", "Customized"];

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedGroups = localStorage.getItem("todoGroups");
    if (savedGroups) {
      setGroups(JSON.parse(savedGroups)); // Parse and set groups from localStorage
    }
  }, [setGroups]);

  useEffect(() => {
    localStorage.setItem("todoGroups", JSON.stringify(groups)); // Save groups to localStorage
  }, [groups]);

  const handleSelectedRepeatType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRepeatType(e.target.value as RepeatType);
  };

  const formatDate = (date: Date | undefined): string => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  function formatDateTime(date: Date | undefined) {
    if (!(date instanceof Date) || isNaN(date.getTime())) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const handleAddTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (newTaskDescription.trim().length !== 0) {
      const newTask: TodoType = {
        id: Date.now(),
        description: newTaskDescription,
        completed: status, // **2. Set the completed status from the new status state**
        dueDate: newDueDate,
        remindme: newRemindme,
        repeat: selectedRepeatType,
        listType: [],
        status: ""
      };

      // **3. Logic to determine where to add the new task**
      if (nameParam === "Personal" || nameParam === "Work" || nameParam === "Urgent") {
        setGroups((prevGroups: Group[]) =>
          prevGroups.map((group) => {
            if (group.groupList.some((list) => list.name === "default")) {
              return {
                ...group,
                groupList: group.groupList.map((list) => {
                  if (list.name === "default") {
                    return {
                      ...list,
                      lists: [
                        ...list.lists,
                        { ...newTask, listType: [nameParam as ListType] },
                      ],
                    };
                  }
                  return list;
                }),
              };
            }
            return group;
          })
        );
      }

      setGroups((prevGroups: Group[]) =>
        prevGroups.map((group) => {
          if (group.groupList.some((list) => list.name === nameParam)) {
            return {
              ...group,
              groupList: group.groupList.map((list) => {
                if (list.name === nameParam) {
                  return {
                    ...list,
                    lists: [...list.lists, newTask],
                  };
                }
                return list;
              }),
            };
          }
          return group;
        })
      );

      setNewTaskDescription("");
      setStatus(false); // **4. Reset the status back to false after adding the task**
    }
  };

  return (
    <div className="p-4 space-y-4 bg-white rounded-xl mt-5">
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Add Task"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          className="p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-around">
          <label className="block text-sm text-gray-700">
            Due Date
            <input
              type="datetime-local"
              value={formatDateTime(newDueDate)}
              onChange={(e) =>
                setNewDueDate(e.target.value ? new Date(e.target.value) : undefined)
              }
              className="mt-1 p-2 ml-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="block text-sm text-gray-700">
            Remind Me
            <input
              type="datetime-local"
              value={formatDateTime(newRemindme)}
              onChange={(e) =>
                setRemindme(e.target.value ? new Date(e.target.value) : undefined)
              }
              className="mt-1 p-2 ml-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label>
            Repeat
            <select
              value={selectedRepeatType}
              onChange={handleSelectedRepeatType}
              className="p-2 ml-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={undefined}>Default</option>
              {repeatTypes.map((repeatType) => (
                <option key={repeatType}>{repeatType}</option>
              ))}
            </select>
          </label>

          {/* **5. Added a toggle for task completion status** */}
          <label className="block text-sm text-gray-700">
            Completed
            <input
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)} // Update status based on checkbox
              className="ml-4 accent-blue-500"
            />
          </label>
        </div>

        <button
          onClick={(e) => handleAddTask(e)}
          className="px-4 py-2 bg-green-700 text-white font-bold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-black-500"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};
