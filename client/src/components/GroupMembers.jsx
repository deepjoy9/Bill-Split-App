import React from "react";

const GroupMembers = ({ groupMembers, toggleModal }) => {
  return (
    <div className="group-members-container">
      <div className="members-container">
        <span className="close" onClick={toggleModal}></span>
        <h2>Group Members</h2>
        <div>
          {groupMembers.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </div>
      </div>
      <button onClick={toggleModal}>Cancel</button>
    </div>
  );
};

export default GroupMembers;
