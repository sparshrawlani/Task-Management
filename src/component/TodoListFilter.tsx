import React, { useDebugValue } from "react";
import { useTodo } from "./TodoProvider";
import TodoItem from "./TodoItem";
import { useParams } from "react-router-dom";
import { AddTodo } from "./AddTodo";
import DeleteButtonTodo from "./DeleteButtonTodo";

export const TodoListFilter: React.FC = () => {
  const { filterListType } = useParams<{
    filterListType: string | undefined;
  }>();
  const { groups } = useTodo();

  const todoLists = groups
    .flatMap((group) => group.groupList)
    .flatMap((groupList) => groupList.lists)
    .filter(
      (todo) => filterListType && todo.listType.includes(filterListType as any)
    );

  useDebugValue(groups, (groups) => `${groups}`);

  return (
    <div className="p-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md">
      <h1 className="text-3xl mb-4 text-white">{filterListType}</h1>
      <div>
        {todoLists.map((todo) => (
          <div className="p-4 bg-white rounded-lg shadow-md my-5">
            <TodoItem key={todo.id} {...todo} />
            <div className="mt-4 flex justify-end">
              <DeleteButtonTodo
                todoId={todo.id}
                nameParam={filterListType as string}
              />
            </div>
          </div>
        ))}
      </div>
      <AddTodo nameParam={filterListType} />
    </div>
  );
};
