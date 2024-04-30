import React, { createContext, useState } from "react";

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activityLog, setActivityLog] = useState([]);

  const addActivity = (activityData) => {
    setActivityLog([...activityLog, activityData]);
  };

  return (
    <ActivityContext.Provider value={{ activityLog, addActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};
