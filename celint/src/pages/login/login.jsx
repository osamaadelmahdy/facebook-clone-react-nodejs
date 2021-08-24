import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCall";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFeching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    console.log(email.current.value);
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h1>OsamaSocial</h1>
          <p>connect with friends and the world around you on OsamaSocial</p>
        </div>
        <form onSubmit={handleClick} className="loginRight">
          <div>
            <input
              type="email"
              placeholder="Email"
              ref={email}
              value="aya@osama.com"
            />
            <input
              type="text"
              placeholder="Password"
              ref={password}
              value="123"
            />
            <button type="submit">{isFeching ? "Loading.." : "Log in"}</button>
            <span>Forgot password?</span>
            <button>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "white" }}
              >
                Create new account
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
