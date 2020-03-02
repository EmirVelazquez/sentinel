import React from "react";
import { Router, Scene, Stack } from "react-native-router-flux";
import Home from "./components/pages/Home";
import SignUp from "./components/pages/SignUp";
import Information from "./components/pages/Information";
import MapLanding from "./components/pages/MapLanding";
import ForgotEmail from "./components/pages/ForgotEmail";
import ForgotEmailSubmit from "./components/pages/ForgotEmailSubmit";
import NewMember from "./components/NewMember";

const Routes = () => (
  <Router>
    <Stack key="root">
      <Scene key="home" component={Home} initial={true} hideNavBar />
      <Scene key="SignUp" component={SignUp} hideNavBar />
      <Scene key="Information" component={Information} hideNavBar />
      <Scene key="MapLanding" component={MapLanding} hideNavBar />
      <Scene key="ForgotEmail" component={ForgotEmail} hideNavBar />
      <Scene key="ForgotEmailSubmit" component={ForgotEmailSubmit} hideNavBar />
      {/* <Scene key="NewMember" component={NewMember} hideNavBar /> */}
    </Stack>
  </Router>
);

export default Routes;
