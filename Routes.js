import React from "react";
import { Router, Scene } from "react-native-router-flux";
import Home from "./components/Home";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";

const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene key="home" component={Home} title="Home" initial={true} />
      <Scene key="LogIn" component={LogIn} title="Log In" />
      <Scene key="SignUp" component={SignUp} title="Signup" />
    </Scene>
  </Router>
);

export default Routes;
