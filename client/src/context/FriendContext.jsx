import React, { createContext, useState } from "react";

export const FriendContext = createContext();

export const FriendProvider = ({ children }) => {
  //const [friends, setFriends] = useState([]);

  //Dummy Data
  const friendsData = [
    { name: "John", number: "123-456-7890" },
    { name: "Alice", number: "987-654-3210" },
    { name: "Bob", number: "555-123-4567" },
    { name: "Eva", number: "222-333-4444" },
  ];
  const [friends, setFriends] = useState(friendsData);

  const addFriend = (name, number) => {
    const newFriend = { name, number };
    setFriends([...friends, newFriend]);
  };

  return (
    <FriendContext.Provider value={{ friends, addFriend }}>
      {children}
    </FriendContext.Provider>
  );
};
