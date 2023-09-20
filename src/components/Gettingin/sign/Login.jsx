import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    navigate("/home");
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <h1>Log in</h1>
      <div className="input_container">
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
          <input type="checkbox" name="accept" />
          <span>Remember Me!</span>
          <Link to="/signup" className="forgot">
            Sign Up?
          </Link>
        </div>
      </div>
      <div className="buttoncontainer">
        <button type="submit" className="button">
          Log In
        </button>
      </div>
    </form>
  );
}

export default Login;
