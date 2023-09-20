import React from "react";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <h1>Sign Up!</h1>
      <div className="input_container">
        <div className="input name">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="Enter Name" required />
        </div>
        <div className="input email">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Enter Email" required />
        </div>
        <div className="input password">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            required
          />
        </div>
        <div className="input checkbox">
          <input type="checkbox" name="accept" required />
          <span>I accept the terms & conditions.</span>
          <Link to="/" className="forgot">
            Log In?
          </Link>
        </div>
      </div>
      <div className="buttoncontainer">
        <button type="submit" className="button">
          Sign Up
        </button>
        
      </div>
    </form>
  );
}

export default SignUp;
