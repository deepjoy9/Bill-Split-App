import React from "react";

const MyGroups = ({ name, date }) => {
  return (
    <>
      <div className="group-container">
        <div className="group-info">
          <h2>{name}</h2>
          <p>{date}</p>
        </div>
      </div>
    </>
  );
};

export default MyGroups;
