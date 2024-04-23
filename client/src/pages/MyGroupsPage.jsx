import React, { useContext, useState } from "react";
import MyGroups from "../components/MyGroups";
import { GroupContext } from "../context/GroupContext";

const MyGroupsPage = () => {
  const { groups } = useContext(GroupContext);

  return (
    <div>
      {groups.map((group, index) => (
        <MyGroups key={index} name={group.name} date={group.date} />
      ))}
    </div>
  );
};

export default MyGroupsPage;
