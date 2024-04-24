import React from "react";
import { Link } from "react-router-dom";

const MyFriends = ({ name, number }) => {
  return (
    <>
      <div className="group-container">
        <div className="group-info">
          <Link to={`/groups/${name}`}>
            <h2>{name}</h2>
            <p>{number}</p>
          </Link>
        </div>
      </div>
    </>
  );
};
export default MyFriends;
