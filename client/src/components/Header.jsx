import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/" className="logo">
        Bill Splitter
      </Link>
      <nav>
        <Link to="/">My Groups</Link>
        <Link to="/friends">My Friends</Link>
      </nav>
    </header>
  );
};

export default Header;
