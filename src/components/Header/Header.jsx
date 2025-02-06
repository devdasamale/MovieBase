import React, { useState } from "react";
import "./Header.css";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
const Header = () => {
  const watchListItems = useSelector((state) => state.movieInfo.watchList);
  const users = useSelector((state) => state.movieInfo.users);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const closeNavbar = () => {
    setClicked(false);
  };

  return (
    <div className="header">
      <div className="header-left">
        <Link to={"/"} className="header-icon" title="MovieBase">
          Movie<span>Base</span>
        </Link>
        <div className="nav-items" id={clicked ? "navbar-active" : "navbar"}>
          {users.length > 0 && (
            <span className="username-mobile" title="Expand menu">
              {" "}
              <i className="fa-solid fa-user"> </i>
              {users[0]}
            </span>
          )}

          <NavLink to={"/"} onClick={closeNavbar} title="Home">
            <span>Home</span>
          </NavLink>

          <NavLink to={"/movies/popular"} onClick={closeNavbar} title="Popular">
            <span>Popular</span>
          </NavLink>
          <NavLink
            to={"/movies/top_rated"}
            onClick={closeNavbar}
            title="Top rated"
          >
            <span>Top Rated</span>
          </NavLink>
          <NavLink
            to={"/movies/upcoming"}
            onClick={closeNavbar}
            title="Upcoming"
          >
            <span>Upcoming</span>
          </NavLink>

          <NavLink
            to={"/search"}
            className="search-btn-nav"
            onClick={closeNavbar}
            title="Search"
          >
            <span>Search</span>
          </NavLink>
        </div>
      </div>
      <div className="header-right">
        {users.length > 0 && (
          <span className="username-div" title="Username">
            {users[0]}
          </span>
        )}

        <NavLink to={"/watchlist"} title="Watchlist">
          <span>
            <i className="fa-solid fa-heart"> </i>
          </span>
          <sup>{watchListItems.length > 0 && watchListItems.length}</sup>
        </NavLink>

        <div id="mobile" onClick={handleClick}>
          <i id="bar" className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </div>
    </div>
  );
};

export default Header;
