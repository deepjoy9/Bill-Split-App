import React, { useContext, useState } from "react";
import { GroupContext } from "../context/GroupContext";
import { FriendContext } from "../context/FriendContext";

const CreateGroup = ({ toggleModal }) => {
  const [groupName, setGroupName] = useState("");
  const { addGroup } = useContext(GroupContext);
  const [groupMembers, setGroupMembers] = useState([]);
  const [showMembersAccordion, setShowMembersAccordion] = useState(false);
  const { friends } = useContext(FriendContext);

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const generateGroupId = () => {
    // Generate a random string of characters (you can use a library like uuid)
    const randomString = Math.random().toString(36).substring(2, 8);
    // Concatenate with a prefix to ensure uniqueness
    const groupId = `group_${randomString}`;
    return groupId;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const groupDetails = {
      name: groupName,
      groupMembers: groupMembers,
      date: new Date().toLocaleDateString(),
      groupId: generateGroupId(),
    };
    console.log(groupDetails);
    addGroup(groupDetails);
    setGroupName("");
    setGroupMembers([]);
    toggleModal();
  };

  const toggleMembersAccordion = () => {
    setShowMembersAccordion(!showMembersAccordion);
  };

  const handleCheckboxChange = (memberName) => {
    if (groupMembers.includes(memberName)) {
      setGroupMembers(groupMembers.filter((name) => name !== memberName));
    } else {
      setGroupMembers([...groupMembers, memberName]);
    }
  };

  return (
    <>
      <div className="create-group-container">
        <h2>Create a new group</h2>
        <form>
          <div className="form-group">
            <label htmlFor="group-name">Group Name:</label>
            <input
              type="text"
              name="group-name"
              placeholder="Enter group name"
              value={groupName}
              onChange={handleGroupNameChange}
              required
            ></input>
          </div>

          {/* Add Members to Group */}
          <div>
            <button type="button" onClick={toggleMembersAccordion}>
              Add Members
            </button>
            {showMembersAccordion && (
              <div className="add-members-container">
                <div className="checkbox-container">
                  {friends.map((member, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        id={`member-${index}`}
                        value={member.name}
                        checked={groupMembers.includes(member.name)}
                        onChange={() => handleCheckboxChange(member.name)}
                      />
                      <label
                        className="add-members-label"
                        htmlFor={`member-${index}`}
                      >
                        {member.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button onClick={handleSubmit}>Create Group</button>
          <button onClick={toggleModal}>Cancel</button>
        </form>
      </div>
    </>
  );
};

export default CreateGroup;
