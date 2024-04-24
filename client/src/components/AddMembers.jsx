import React, { useContext, useState } from "react";
import { FriendContext } from "../context/FriendContext";

const AddMembers = ({ toggleModal }) => {
  const { friends } = useContext(FriendContext);
  const [selectedFriends, setSelectedFriends] = useState([]);

  const handleCheckboxChange = (friendName) => {
    if (selectedFriends.includes(friendName)) {
      setSelectedFriends(selectedFriends.filter((name) => name !== friendName));
    } else {
      setSelectedFriends([...selectedFriends, friendName]);
    }
  };

  const handleAddMembers = () => {
    // Implement your logic to add selected friends to the group
    console.log("Selected Friends:", selectedFriends);
    // Reset selectedFriends state after adding members
    setSelectedFriends([]);
  };

  return (
    <div className="add-members-container">
      <h2>Add Members</h2>
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
            />
            <label className="add-members-label" htmlFor={`friend-${index}`}>{friend.name}</label>
          </div>
        ))}
      </div>

      <button onClick={handleAddMembers}>Add Selected Members</button>
      <button onClick={toggleModal}>Cancel</button>
    </div>
  );
};

export default AddMembers;
