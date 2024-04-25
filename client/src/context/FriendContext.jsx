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
    { name: "Sarah", number: "111-222-3333" },
    { name: "Michael", number: "444-555-6666" },
    { name: "Emily", number: "777-888-9999" },
    { name: "David", number: "123-456-7890" },
    { name: "Olivia", number: "987-654-3210" },
    { name: "James", number: "555-123-4567" },
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
