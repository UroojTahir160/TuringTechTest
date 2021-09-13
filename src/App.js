import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";
import MainNavbar from "../src/shared/NavigationElements/MainNavbar";

function App() {
  const { token, login, logout, userId } = useAuth();
  const location = useLocation();
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <div className="App">{routes}</div>
      {location.pathname !== "/auth" && <MainNavbar />}
    </AuthContext.Provider>
  );
}

export default App;
