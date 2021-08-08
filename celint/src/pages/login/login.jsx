import "./login.css";

export default function Login() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h1>OsamaSocial</h1>
          <p>connect with friends and the world around you on OsamaSocial</p>
        </div>
        <div className="loginRight">
          <div>
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Password" />
            <button>Log in</button>
            <span>Forgot password?</span>
            <button>Create new account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
