import { useContext } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Messenger from "./pages/messenger/messenger";
import Profile from "./pages/profile/profile";
import Register from "./pages/register/register";
// import Test from "./pages/test/test";

export default function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/messenger">
          {/* {!user ? <Redirect to="/" /> : <Messenger />} */}
          <Messenger />
        </Route>
        <Route path="/profile/:id">
          <Profile />
        </Route>
        <Route exact path="/">
          {user ? <Home /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
    // <Test />
  );
}
