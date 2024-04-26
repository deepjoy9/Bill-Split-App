import React from "react";
import { Link } from "react-router-dom";

const MyGroups = ({ name, date, groupMembers }) => {
  const totalMembers = groupMembers.length;

  return (
    <>
      <div className="group-container">
        <div className="group-info">
          <Link to={`/groups/${name}`}>
            <h2>{name}</h2>
            <p>{date}</p>
            <p>Total Members: {totalMembers}</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MyGroups;
