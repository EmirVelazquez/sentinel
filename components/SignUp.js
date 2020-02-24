import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { Actions } from "react-native-router-flux";

import Styles from "../css/styles";
import Separator from "./Separator";

class SignUp extends Component {
  // Retrieving input data
  state = {
    signUpEmail: "",
    signUpPassword: "",
    signUpConfirm: "",
    hidePassword: true
  };

  goToSetUp = () => {
    Actions.SetUp();
  };

  //Individual onChange handlers for each part of state
  //=========================================================
  handleSignupEmailChange = event => {
    console.log("Email Change: " + event);
    this.setState({
      signUpEmail: event
    });
  };
  handleSignUpPasswordChange = event => {
    console.log("Password Change: " + event);
    this.setState({
      signUpPassword: event
    });
  };
  handleSignupConfirmChange = event => {
    console.log("Confirm Password Change: " + event);
    this.setState({
      signUpConfirm: event
    });
  };
  //=========================================================

  // State can be passed to the backend for auth -Justin
  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    this.setState({
      signUpEmail: this.state.signUpEmail,
      signUpPassword: this.state.signUpPassword,
      signUpConfirm: this.state.signUpConfirm
    });
    this.goToSetUp();
  };

  managePasswordVisability = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };

  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.header}>Sign Up</Text>
        <View style={Styles.innerContainer}>
          <TextInput
            name="signUpEmail"
            placeholder="Email"
            style={{
              height: 40,
              backgroundColor: "black",
              borderColor: "gray",
              borderTopWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderWidth: 2,
              color: "white"
            }}
            onChangeText={this.handleSignupEmailChange}
            signUpEmail={this.state.signUpEmail}
            keyboardType="email-address"
          />

          <Separator />

          <TextInput
            name="SignUpPassword"
            placeholder="Password"
            style={{
              height: 40,
              backgroundColor: "black",
              borderColor: "gray",
              borderTopWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderWidth: 2,
              color: "white"
            }}
            onChangeText={this.handleSignUpPasswordChange}
            signUpPassword={this.state.signUpPassword}
            secureTextEntry={this.state.hidePassword}
          />

          <Separator />

          <TextInput
            name="signUpConfirm"
            placeholder="Confirm Password"
            style={{
              height: 40,
              backgroundColor: "black",
              borderColor: "gray",
              borderTopWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderWidth: 2,
              color: "white"
            }}
            onChangeText={this.handleSignupConfirmChange}
            signUpConfirm={this.state.signUpConfirm}
            secureTextEntry={this.state.hidePassword}
          />
          <Separator />
          <Separator />

          <Button
            title="Show Password"
            color="black"
            onPress={this.managePasswordVisability}
          />
        </View>

        <Separator />

        <Button title="Submit" onPress={this.handleFormSubmit} />
      </View>
    );
  }
}

export default SignUp;
