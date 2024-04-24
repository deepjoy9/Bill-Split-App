import React, { useContext, useState } from "react";
import { FriendContext } from "../context/FriendContext";

const AddFriends = ({ toggleModal }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const { addFriend } = useContext(FriendContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addFriend(name, number);
    setName("");
    setNumber("");
    toggleModal();
  };
  return (
    <>
      <div className="create-group-container">
        <h2>Add Friends : </h2>
        <form>
          <div className="form-group">
            <input
              type="text"
              name="friend-name"
              placeholder="Enter friend name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></input>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="friend-number"
              placeholder="Enter phone number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            ></input>
          </div>
          <button onClick={handleSubmit}>Add Friend</button>
          <button onClick={toggleModal}>Cancel</button>
        </form>
      </div>
    </>
  );
};

export default AddFriends;
