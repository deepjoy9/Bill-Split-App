import React, { createContext, useState } from "react";

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);

  const addGroup = (groupName) => {
    setGroups([...groups, groupName]);
  };
  const updateGroup = (groupId, updatedGroup) => {
    console.log("Updating group with ID:", groupId);
    console.log("Updated group:", updatedGroup);

    const updatedGroups = groups.map((group) =>
      group.groupId === groupId
        ? { ...group, groupMembers: updatedGroup.members }
        : group
    );

    console.log("Updated groups:", updatedGroups);

    setGroups(updatedGroups);
  };

  return (
    <GroupContext.Provider value={{ groups, addGroup, updateGroup }}>
      {children}
    </GroupContext.Provider>
  );
};
