import React from "react";
import { Router, Scene, Stack } from "react-native-router-flux";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Information from "./components/Information";
import MapLanding from "./components/MapLanding";
import ForgotEmail from "./components/ForgotEmail";
import ForgotEmailSubmit from "./components/ForgotEmailSubmit";

const Routes = () => (
  <Router>
    <Stack key="root">
      <Scene key="home" component={Home} initial={true} hideNavBar />
      <Scene key="SignUp" component={SignUp} hideNavBar />
      <Scene key="Information" component={Information} hideNavBar />
      <Scene key="MapLanding" component={MapLanding} hideNavBar />
      <Scene key="ForgotEmail" component={ForgotEmail} hideNavBar />
      <Scene key="ForgotEmailSubmit" component={ForgotEmailSubmit} hideNavBar />
    </Stack>
  </Router>
);

export default Routes;
