import { useContext, useRef } from "react";
import "./register.css";
import { AuthContext } from "../../context/AuthContext";
import { registerCall } from "../../apiCall";
import { Link } from "react-router-dom";

export default function Register() {
  const username = useRef();

  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const { user, isFeching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    console.log(email.current.value);
    if (password.current.value !== passwordAgain.current.value) {
      return dispatch({
        type: "LOGIN_FAILURE",
        payload: "passwords must be same",
      });
    }
    registerCall(
      {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
  };

  console.log(user);
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h1>OsamaSocial</h1>
          <p>connect with friends and the world around you on OsamaSocial</p>
        </div>
        <form onSubmit={handleClick} className="registerRight">
          <div>
            <input type="text" placeholder="User name" ref={username} />
            <input type="text" placeholder="Email" ref={email} />
            <input type="text" placeholder="Password" ref={password} />
            <input
              type="text"
              placeholder="Password again"
              ref={passwordAgain}
            />
            <button type="submit">Register</button>
            <button>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                Log into account
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
