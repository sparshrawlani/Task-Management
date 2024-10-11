import React, { useDebugValue } from "react";
import { useTodo } from "./TodoProvider";
import TodoItem from "./TodoItem";
import { useParams } from "react-router-dom";
import { AddTodo } from "./AddTodo";

export const TodoListSearch: React.FC = () => {
  const { searchTerm } = useParams<{
    searchTerm: string | undefined;
  }>();
  const { groups } = useTodo();

  const todoLists = groups
    .flatMap((group) => group.groupList)
    .flatMap((groupList) => groupList.lists)
    .filter((todo) =>
      todo.description.toLowerCase().includes(searchTerm?.toLowerCase() as any)
    );

  return (
    <>
      <div className="p-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md w-full">
        {todoLists.map((todo) => (
          <div key={todo.id} className="p-4 bg-white rounded-lg shadow-md mt-5">
            <TodoItem {...todo} />
          </div>
        ))}
      </div>
    </>
  );
};
