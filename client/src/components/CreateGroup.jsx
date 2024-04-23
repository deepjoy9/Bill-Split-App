import React, { useContext, useState } from "react";
import { GroupContext } from "../context/GroupContext";

const CreateGroup = ({ toggleModal }) => {
  const [groupName, setGroupName] = useState("");
  const { addGroup } = useContext(GroupContext);

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addGroup(groupName);
    setGroupName("");
    toggleModal();
  };
  return (
    <>
      <div className="create-group-container">
        <h2>Create a new group</h2>
        <form id="create-group-form">
          <div className="form-group">
            <label htmlFor="group-name">Group Name:</label>
            <input
              type="text"
              id="group-name"
              name="group-name"
              placeholder="Enter group name"
              value={groupName}
              onChange={handleGroupNameChange}
              required
            ></input>
          </div>
          <button onClick={handleSubmit}>Create Group</button>
          <button onClick={toggleModal}>Cancel</button>
        </form>
      </div>
    </>
  );
};

export default CreateGroup;
