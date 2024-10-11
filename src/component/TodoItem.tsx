import React, { useEffect, useState } from "react";
import { List, ListType, RepeatType, TodoType } from "../types";
import { useTodo } from "./TodoProvider";
import { listTypes as availableListTypes } from "../data";

const TodoItem: React.FC<TodoType> = (todo) => {
  const { groups, setGroups } = useTodo();
  const [newTaskDescription, setNewTaskDescription] = useState(
    todo.description
  );
  const [newDueDate, setNewDueDate] = useState<Date | undefined>(todo.dueDate);
  const [newRemindme, setRemindme] = useState<Date | undefined>(todo.remindme);
  const [selectedRepeatType, setSelectedRepeatType] = useState<
    RepeatType | undefined
  >(todo.repeat);
  const [listType, setListType] = useState<ListType[]>(todo.listType);
  const repeatTypes = [
    "Daily",
    "WeekDays",
    "Weekly",
    "Monthly",
    "Yearly",
    "Customized",
  ];
  const listTypes = availableListTypes; // Assuming this is the correct listTypes source

  function formatDateTime(date: Date | undefined) {
    if (!date) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  useEffect(() => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => ({
        ...group,
        groupList: group.groupList.map((list) => ({
          ...list,
          lists: list.lists.map((item) =>
            todo.id === item.id
              ? {
                  ...item,
                  description: newTaskDescription,
                  dueDate: newDueDate,
                  remindme: newRemindme,
                  repeat: selectedRepeatType,
                  listType: listType,
                }
              : item
          ),
        })),
      }))
    );
  }, [
    newTaskDescription,
    newDueDate,
    newRemindme,
    selectedRepeatType,
    listType,
    setGroups,
    todo.id,
  ]);

  const handleCheckboxChange = (listTypeValue: ListType) => {
    setListType((prevListType) => {
      const isChecked = prevListType.includes(listTypeValue);
      return isChecked
        ? prevListType.filter((item) => item !== listTypeValue)
        : [...prevListType, listTypeValue];
    });
  };

  const handleSelectedRepeatType = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedRepeatType(e.target.value as RepeatType);
  };

  const handleToggle = () => {
    setGroups((prevGroup) =>
      prevGroup.map((group) => ({
        ...group,
        groupList: group.groupList.map((list) => ({
          ...list,
          lists: list.lists.map((item) =>
            todo.id === item.id ? { ...item, completed: !item.completed } : item
          ),
        })),
      }))
    );
  };

  const formatDate = (date: Date | undefined): string => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="flex flex-wrap items-center justify-between p-4 bg-blue-50 rounded-lg shadow-md hover:bg-blue-100 transition duration-200">
      <div className="flex-1 min-w-0 mr-4">
        <label className="block text-sm text-gray-700">
          Description
          <input
            type="text"
            placeholder="Add task"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>

      <div className="flex items-center mr-4 border border-gray-500 p-2 rounded">
        <p className="text-sm text-gray-700" onClick={() => handleToggle()}>
          <label className="block text-sm text-gray-700">
            Status <div>{todo.completed ? "Complete" : "Incomplete"}</div>
          </label>
        </p>
      </div>

      <div className="flex-1 min-w-0 mr-4">
        <label className="block text-sm text-gray-700">
          Due Date
          <input
            type="datetime-local"
            value={formatDateTime(newDueDate)}
            onChange={(e) =>
              setNewDueDate(
                e.target.value ? new Date(e.target.value) : undefined
              )
            }
            className="mt-1 w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>

      <div className="flex-1 min-w-0 mr-4">
        <label className="block text-sm text-gray-700">
          Remind Me
          <input
            type="datetime-local"
            value={formatDateTime(newRemindme)}
            onChange={(e) =>
              setRemindme(e.target.value ? new Date(e.target.value) : undefined)
            }
            className="mt-1 w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>

      <div className="flex-1 min-w-0 mr-4">
        <label className="block text-sm text-gray-700">
          Repeat
          <select
            value={selectedRepeatType}
            onChange={handleSelectedRepeatType}
            className="mt-1 w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={undefined}>Default</option>
            {repeatTypes.map((repeatType) => (
              <option key={repeatType} value={repeatType}>
                {repeatType}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex-1 min-w-0">
        <label className="block text-sm text-gray-700">
          Select Category
          <div className="mt-1 space-y-2">
            {listTypes.map((listTypeValue) => (
              <div key={listTypeValue} className="flex items-center">
                <input
                  type="checkbox"
                  id={listTypeValue}
                  checked={listType.includes(listTypeValue as ListType)}
                  onChange={() =>
                    handleCheckboxChange(listTypeValue as ListType)
                  }
                  className="mr-2 w-6 h-6 accent-blue-500"
                />
                <label
                  htmlFor={listTypeValue}
                  className="text-sm text-gray-700"
                >
                  {listTypeValue}
                </label>
              </div>
            ))}
          </div>
        </label>
      </div>
    </div>
  );
};

export default TodoItem;
