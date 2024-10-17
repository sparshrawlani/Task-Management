import React from "react";
import { useTodo } from "./TodoProvider";
import { Group, ListType } from "../types";

export interface DeleteButtonProps {
  todoId: number;
  nameParam: string | undefined;
}

const DeleteButtonTodo: React.FC<DeleteButtonProps> = ({
  todoId,
  nameParam,
}) => {
  const { groups, setGroups } = useTodo();
  const handleDeleteTodoItem = () => {
    if (nameParam == "Personal" || "Work" || "Urgent") {
      setGroups((prevGroups) =>
        prevGroups.map((group) => ({
          ...group,
          groupList: group.groupList.map((list) => ({
            ...list,
            lists: list.lists.filter((todo) => todoId !== todo.id),
          })),
        }))
      );
    }

    setGroups((prevGroups) =>
      prevGroups.map((group) => ({
        ...group,
        groupList: group.groupList.map((list) =>
          list.name === nameParam
            ? {
                ...list,
                lists: list.lists.filter((todo) => todo.id !== todoId),
              }
            : list
        ),
      }))
    );
  };
  return (
    <div className="w-full p-2">
      <button
        onClick={() => handleDeleteTodoItem()}
        className="py-2 px-4 w-full bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteButtonTodo;
