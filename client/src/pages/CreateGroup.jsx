import React from "react";

const CreateGroup = () => {
  
  return (
    <>
      <div class="create-group-container">
        <h2>Create a new group</h2>
        <form id="create-group-form">
          <div class="form-group">
            <label for="group-name">Group Name:</label>
            <input
              type="text"
              id="group-name"
              name="group-name"
              placeholder="Enter group name"
              required
            ></input>
          </div>
          <button type="submit">Create Group</button>
        </form>
      </div>
    </>
  );
};

export default CreateGroup;
