import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.css";

function UserProfile() {
  const [profileIcon, setProfileIcon] = useState("");
  const location = useLocation();

  useEffect(() => {
    const randomIconId = Math.floor(Math.random() * 1000);
    fetch(`https://picsum.photos/id/${randomIconId}/info`)
    .then((response) => response.json())
    .then((data) => setProfileIcon(data.download_url))
    .catch((error) => console.error("Error fetching profile icon:", error));
  }, []);

  return (
    <nav className="navbar">
      {(location.pathname!=='/' || location.pathname!=='/signup') ? (
        <>
          <div className="navbar-logo">
            <Link to="/home">
              <span className="logo-text">TasksBoards</span>
            </Link>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/Calculator">Calculator</Link>
            </li>
            <li>
              <Link to="/Weather">Weather</Link>
            </li>
          </ul>
        </>
      ):(
        <>
          <div className="navbar-logo">
            <Link to="/login">
              <span className="logo-text">TasksBoards</span>
            </Link>
          </div>
        </>
      )}

      <div className="icon">
        <img src={profileIcon} alt="" className="logo" />
      </div>
    </nav>
  );
}

export default UserProfile;
