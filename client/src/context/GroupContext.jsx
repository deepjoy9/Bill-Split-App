import React, { createContext, useState } from "react";

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);

  const addGroup = (groupName) => {
    const newGroup = { name: groupName, date: new Date().toLocaleDateString() };
    setGroups([...groups, newGroup]);
  };

  return (
    <GroupContext.Provider value={{ groups, addGroup }}>
      {children}
    </GroupContext.Provider>
  );
};
