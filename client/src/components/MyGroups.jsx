import React from "react";
import { Link } from "react-router-dom";

const MyGroups = ({ name, date }) => {
  return (
    <>
      <div className="group-container">
        <div className="group-info">
          <Link to={`/my-groups/${name}`}>
            <h2>{name}</h2>
            <p>{date}</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MyGroups;
