import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <Link to="/" className="logo">
        Bill Splitter
      </Link>
      <nav
        className={`nav-links ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <Link to="/">My Groups</Link>
        <Link to="/friends">My Friends</Link>
      </nav>
      <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>
    </header>
  );
};

export default Header;
