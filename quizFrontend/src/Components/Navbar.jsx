import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <Link to="/" className="text-white font-bold text-xl">
        Pokemon Quiz
      </Link>
      <Link
        to="/leaderboard"
        className="bg-white text-blue-500 rounded px-4 py-2"
      >
        Leaderboard
      </Link>
    </nav>
  );
};

export default Navbar;
