import React, { useContext, useState } from "react";
import MyFriends from "../components/MyFriends";
import AddFriends from "../components/AddFriends";
import { FriendContext } from "../context/FriendContext";

const MyFriendsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { friends } = useContext(FriendContext);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <div className="add-friends-button">
        <button onClick={toggleModal}>Add Friends +</button>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={toggleModal}></span>
              <AddFriends toggleModal={toggleModal} />
            </div>
          </div>
        )}
      </div>
      <div className="my-friends-list">
        {friends.map((friend, index) => (
          <MyFriends key={index} name={friend.name} number={friend.number} />
        ))}
      </div>
    </div>
  );
};

export default MyFriendsPage;
