import React, { useContext, createContext, useState, useEffect, ReactNode } from "react";
import { Group, TodoContextType } from "../types";
import mockData from "../data";

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [groups, setGroups] = useState<Group[]>(() => {
    const savedGroups = localStorage.getItem("todoGroups");
    if (savedGroups) {
      const parsedGroups = JSON.parse(savedGroups);
      // **Parse any string dates back to Date objects**
      return parsedGroups.map((group: { groupList: any[]; }) => ({
        ...group,
        groupList: group.groupList.map(list => ({
          ...list,
          lists: list.lists.map((task: { dueDate: string | number | Date; remindme: string | number | Date; }) => ({
            ...task,
            dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
            remindme: task.remindme ? new Date(task.remindme) : undefined,
          })),
        })),
      }));
    }
    return [
      ...mockData,
      { name: "default", groupList: [{ name: "default", lists: [] }] },
    ]; // Fallback to mockData if no saved data
  });

  useEffect(() => {
    localStorage.setItem("todoGroups", JSON.stringify(groups));
  }, [groups]);

  return (
    <TodoContext.Provider value={{ groups, setGroups }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodo must be used within a TodoProvider");
  return context;
};
