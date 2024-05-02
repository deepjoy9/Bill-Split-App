import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { FriendContext } from "../context/FriendContext";
import { GroupContext } from "../context/GroupContext";
import { ActivityContext } from "../context/ActivityContext";

const AddMembers = ({ toggleModal, alreadyAddedMembers, groupId }) => {
  const { updateGroup } = useContext(GroupContext);
  const { addActivity } = useContext(ActivityContext);
  const { friends } = useContext(FriendContext);
  const [selectedFriends, setSelectedFriends] = useState([]);

  const memoizedFriends = useMemo(() => friends, [friends]);

  useEffect(() => {
    setSelectedFriends(alreadyAddedMembers);
  }, [alreadyAddedMembers]);

  const handleCheckboxChange = useCallback((friendName) => {
    setSelectedFriends((prevSelectedFriends) => {
      if (prevSelectedFriends.includes(friendName)) {
        return prevSelectedFriends.filter((name) => name !== friendName);
      } else {
        return [...prevSelectedFriends, friendName];
      }
    });
  }, []);

  const memoizedUpdateGroup = useCallback(
    (groupId, groupData) => {
      updateGroup(groupId, groupData);
    },
    [updateGroup]
  );

  const memoizedAddActivity = useCallback(
    (activityDetails) => {
      addActivity(activityDetails);
    },
    [addActivity]
  );

  const handleAddMembers = () => {
    const uniqueSelectedFriends = [...new Set(selectedFriends)];

    memoizedUpdateGroup(groupId, { members: uniqueSelectedFriends });

    const newlyAddedMembers = uniqueSelectedFriends.filter(
      (friend) => !alreadyAddedMembers.includes(friend)
    );

    const activityMessage = `Added ${newlyAddedMembers.join(
      ", "
    )} to the group`;

    const activityDetails = {
      groupId: groupId,
      activityMessage: activityMessage,
    };
    memoizedAddActivity(activityDetails);

    setSelectedFriends([]);
    toggleModal();
  };

  return (
    <div className="add-members-container">
      <h2>Add New Members : </h2>
      <div className="checkbox-container">
        {memoizedFriends.map((friend, index) => (
          <div key={index}>
            <input
              className="checkbox-input"
              type="checkbox"
              id={`friend-${index}`}
              value={friend.name}
              checked={selectedFriends.includes(friend.name)}
              onChange={() => handleCheckboxChange(friend.name)}
              disabled={alreadyAddedMembers.includes(friend.name)}
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
