import React from "react";
import { Router, Scene, Stack } from "react-native-router-flux";
import Home from "./components/Home";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import MasterCreate from "./components/MasterCreate";
import SlaveCreate from "./components/SlaveCreate";
import Information from "./components/Information";

const Routes = () => (
  <Router>
    <Stack key="root">
      <Scene key="home" component={Home} title="Home" initial={true} />
      <Scene key="LogIn" component={LogIn} title="Log In" />
      <Scene key="SignUp" component={SignUp} title="Signup" />
      <Scene key="SetUp" component={MasterCreate} title="Signup" />
      <Scene key="ChildUser" component={SlaveCreate} title="Children" />
      <Scene key="Information" component={Information} />
    </Stack>
  </Router>
);

export default Routes;
