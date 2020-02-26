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
      <Scene key="home" component={Home} initial={true} hideNavBar />
      <Scene key="LogIn" component={LogIn} hideNavBar />
      <Scene key="SignUp" component={SignUp} hideNavBar />
      <Scene key="SetUp" component={MasterCreate} hideNavBar />
      <Scene key="ChildUser" component={SlaveCreate} hideNavBar />
      <Scene key="Information" component={Information} hideNavBar />
    </Stack>
  </Router>
);

export default Routes;
