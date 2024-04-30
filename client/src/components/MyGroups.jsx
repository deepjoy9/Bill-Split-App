import React from "react";
import { Link } from "react-router-dom";

const MyGroups = ({ name, date, groupMembers, id }) => {
  const totalMembers = groupMembers.length;

  return (
    <>
      <div className="group-container">
        <div className="group-info">
          <Link to={`/groups/${id}`}>
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
