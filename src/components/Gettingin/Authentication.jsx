import React from "react";
import { useLocation,Link } from "react-router-dom";
import "./index.css";
import SignUp from "./sign/SignUp";
import Login from "./sign/Login";

function Authentication() {
  const route = useLocation();
  return (
    <div className="parent">
      {route.pathname === "/" && (
        <Login />
      )}
      {route.pathname === "/signup" && (
        <SignUp />
      )}
    </div>
  );
}

export default Authentication;
