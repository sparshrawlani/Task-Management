import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTodo } from "./TodoProvider";
import { Group, TodoType } from "../types";
import TodoItem from "./TodoItem";
import { AddTodo } from "./AddTodo";
import DeleteButtonTodo from "./DeleteButtonTodo";

const TodoList: React.FC = () => {
  const { nameParam } = useParams<{ nameParam: string }>();
  const { groups, setGroups } = useTodo();

  const groupList = groups
    .flatMap((group) => group.groupList)
    .find((list) => list.name === nameParam);

  if (!groupList) {
    return <p className="text-center text-red-500">List not found</p>;
  }

  return (
    <div className="p-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md w-full">
      <h1 className="text-3xl text-white mb-4">{groupList.name}</h1>
      <div className="space-y-4">
        {groupList.lists.map((todo) => (
          <div key={todo.id} className="p-4 bg-white rounded-lg shadow-md">
            <TodoItem {...todo} />
            <div className="mt-4 flex justify-end">
              <DeleteButtonTodo todoId={todo.id} nameParam={nameParam} />
            </div>
          </div>
        ))}
      </div>
      <AddTodo nameParam={nameParam} />
    </div>
  );
};

export default TodoList;
