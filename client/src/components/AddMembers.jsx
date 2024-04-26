import React, { useContext, useEffect, useState } from "react";
import { FriendContext } from "../context/FriendContext";
import { GroupContext } from "../context/GroupContext";

const AddMembers = ({ toggleModal, alreadyAddedMembers, groupId }) => {
  const { updateGroup } = useContext(GroupContext);
  const { friends } = useContext(FriendContext);
  const [selectedFriends, setSelectedFriends] = useState([]);
  console.log("Group ID in AddMembers component:", groupId);
  console.log(alreadyAddedMembers);

  useEffect(() => {
    // Initialize selectedFriends state with alreadyAddedMembers when the component mounts
    console.log("Rerender", alreadyAddedMembers);
    setSelectedFriends(alreadyAddedMembers);
  }, [alreadyAddedMembers]);

  const handleCheckboxChange = (friendName) => {
    if (selectedFriends.includes(friendName)) {
      setSelectedFriends(selectedFriends.filter((name) => name !== friendName));
    } else {
      setSelectedFriends([...selectedFriends, friendName]);
    }
  };

  const handleAddMembers = () => {
    // Remove duplicates from selectedFriends array
    const uniqueSelectedFriends = [...new Set(selectedFriends)];

    // Update group members using updateGroup function from GroupContext
    updateGroup(groupId, { members: uniqueSelectedFriends });

    // Reset selectedFriends state to empty array after adding members
    setSelectedFriends([]);
    toggleModal();
  };

  return (
    <div className="add-members-container">
      <h2>Add New Members : </h2>
      <div className="checkbox-container">
        {friends.map((friend, index) => (
          <div key={index}>
            <input
              className="checkbox-input"
              type="checkbox"
              id={`friend-${index}`}
              value={friend.name}
              checked={selectedFriends.includes(friend.name)}
              onChange={() => handleCheckboxChange(friend.name)}
              disabled={alreadyAddedMembers.includes(friend.name)} // Disable if friend is already added
            />
            <label className="add-members-label" htmlFor={`friend-${index}`}>
              {friend.name}
            </label>
          </div>
        ))}
      </div>

      <button onClick={handleAddMembers}>Add Selected Members</button>
      <button onClick={toggleModal}>Cancel</button>
    </div>
  );
};

export default AddMembers;
