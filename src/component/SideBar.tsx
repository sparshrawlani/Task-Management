import React, { useDebugValue, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useTodo } from "./TodoProvider";
import { Group } from "../types";
import CloseIcon from "@mui/icons-material/Close";

const SideBar = () => {
  const { groups, setGroups } = useTodo();
  const [expandedGroup, setExpandedGroup] = useState<Set<string>>(new Set());
  const [newListName, setNewListName] = useState<string>("");
  const [newListGroupName, setNewListGroupName] = useState<string>("");
  const [newGroupName, setNewGroupName] = useState<string>("");
  const [listTypes, setNewListType] = useState(["Personal", "Work", "Urgent"]);

  const handleExpandedGroup = (groupName: string) => {
    if (expandedGroup.has(groupName)) {
      setExpandedGroup((prevExpandedGroup) => {
        const newExpanedGroup = new Set(prevExpandedGroup);
        newExpanedGroup.delete(groupName);
        return newExpanedGroup;
      });
    } else {
      setExpandedGroup((prevExpandedGroup) => {
        return new Set(prevExpandedGroup).add(groupName);
      });
    }
  };

  const handleAddGroup = () => {
    if (newGroupName.trim().length === 0) return;
    setGroups((prevGroups) => [
      ...prevGroups,
      { name: newGroupName, groupList: [] },
    ]);
    setNewGroupName("");
  };

  const handleAddList = () => {
    if (newListName.trim().length === 0) return;
    setGroups((prevGroup) => [
      ...prevGroup.map((group) =>
        group.name === newListGroupName
          ? {
              name: group.name,
              groupList: [...group.groupList, { name: newListName, lists: [] }],
            }
          : group
      ),
    ]);
    setNewListGroupName("");
    setNewListName("");
  };

  const handleDeleteGroup = (groupName: string) => {
    setGroups((prevGroups) =>
      prevGroups.filter((group) => group.name !== groupName)
    );
  };

  const handleDeleteGroupList = (groupName: string, groupListName: string) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.name === groupName
          ? {
              ...group,
              groupList: group.groupList.filter(
                (item) => item.name !== groupListName
              ),
            }
          : group
      )
    );
  };
  return (
    <div className="flex mx-5">
      <div className="mr-5">
        <nav>
          <div className="mb-4">
            <span className="block py-2 px-4 bg-blue-500 text-white rounded-lg font-bold">
              Pick a Category Below:
            </span>
          </div>
          <ul>
            {listTypes.map((listType) => (
              <li className="mb-2 text-white" key={listType}>
                <Link
                  className="block py-2 px-4 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200 w-32"
                  to={`filter/${listType}`}
                >
                  {listType}
                </Link>
              </li>
            ))}
          </ul>

          <ul>
            {groups.map(
              (group) =>
                group.name !== "default" && (
                  <li
                    key={group.name}
                    onClick={() => handleExpandedGroup(group.name)}
                    className="mb-2 block py-2 px-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    {group.name}
                    <button
                      className="px-5"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteGroup(group.name);
                      }}
                    >
                      <span className="material-icons">
                        <CloseIcon />
                      </span>
                    </button>
                    {expandedGroup.has(group.name) && (
                      <ul>
                        {group.groupList.map((groupList) => (
                          <li
                            key={groupList.name}
                            className="pl-5 hover:font-medium transition duration-500"
                          >
                            <Link
                              to={`list/${groupList.name}`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {groupList.name}
                              <button
                                className="px-5"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteGroupList(
                                    group.name,
                                    groupList.name
                                  );
                                }}
                              >
                                <CloseIcon />
                              </button>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
            )}
          </ul>
        </nav>

        <div className="space-y-4 p-4 bg-gray-50 rounded-lg shadow-md">
          <div className="flex flex-col space-y-4">
            {/* Sub-Category Section */}
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                required
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="Create a Sub-Category"
                className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newListGroupName}
                onChange={(e) => setNewListGroupName(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {/* Optionally add a placeholder option */}
                <option value="">Select a Category</option>
                {groups.map((group) => (
                  <option value={group.name} key={group.name}>
                    {group.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddList}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Sub-Category
              </button>
            </div>

            {/* Main Category Section */}
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Create a Category"
                className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddGroup}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default SideBar;
