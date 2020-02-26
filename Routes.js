import React from "react";
import { Router, Scene, Stack } from "react-native-router-flux";
import Home from "./components/Home";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import ParentCreate from "./components/ParentCreate";
import ChildCreate from "./components/ChildCreate";
import Information from "./components/Information";
import MapLanding from "./components/MapLanding";

const Routes = () => (
  <Router>
    <Stack key="root">
      <Scene key="home" component={Home} initial={true} hideNavBar />
      <Scene key="LogIn" component={LogIn} hideNavBar />
      <Scene key="SignUp" component={SignUp} hideNavBar />
      <Scene key="SetUp" component={ParentCreate} hideNavBar />
      <Scene key="ChildUser" component={ChildCreate} hideNavBar />
      <Scene key="Information" component={Information} hideNavBar />
      <Scene key="MapLanding" component={MapLanding} hideNavBar />
    </Stack>
  </Router>
);

export default Routes;
