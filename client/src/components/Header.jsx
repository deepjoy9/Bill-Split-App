import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateGroup from "./CreateGroup";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <header>
      <Link to="/" className="logo">
        Bill Splitter
      </Link>
      <nav>
        <Link to="/">My Groups</Link>
        <Link to="/friends">My Friends</Link>
        <button onClick={toggleModal}>+</button>
      </nav>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}></span>
            <CreateGroup toggleModal={toggleModal} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
