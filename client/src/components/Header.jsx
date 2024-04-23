import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/" className="logo">
        Bill Splitter
      </Link>
      <nav>
        <Link to="/" className="all-posts">
          My Groups
        </Link>
        <Link to="/create">Create New Group</Link>
      </nav>
    </header>
  );
};

export default Header;
