import "./register.css";

export default function Register() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h1>OsamaSocial</h1>
          <p>connect with friends and the world around you on OsamaSocial</p>
        </div>
        <div className="loginRight">
          <div>
            <input type="text" placeholder="User name" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Password" />
            <input type="text" placeholder="Password again" />
            <button>Register</button>
            <button>Log into account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
