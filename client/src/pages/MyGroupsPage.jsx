import React, { useContext, useState } from "react";
import MyGroups from "../components/MyGroups";
import { GroupContext } from "../context/GroupContext";
import CreateGroup from "../components/CreateGroup";

const MyGroupsPage = () => {
  const { groups } = useContext(GroupContext);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="my-groups-page">
      <h1>My Groups : </h1>
      <div>
        <button onClick={toggleModal}>Add Group +</button>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={toggleModal}></span>
              <CreateGroup toggleModal={toggleModal} />
            </div>
          </div>
        )}
      </div>
      <div className="my-groups-list">
        {groups.map((group, index) => (
          <MyGroups key={index} name={group.name} date={group.date} />
        ))}
      </div>
    </div>
  );
};

export default MyGroupsPage;
