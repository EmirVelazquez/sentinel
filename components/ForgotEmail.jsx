import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { Actions } from "react-native-router-flux";
import Styles from "../css/styles";
import Separator from "./Separator";
import Button from "apsl-react-native-button";

import Logo from "./Logo";

class ForgotEmail extends Component {
  state = {
    forgotEmail: ""
  };

  //Individual onChange handlers for each part of state
  //=========================================================
  handleEmailChange = event => {
    console.log("Forgot Email Change: " + event);
    this.setState({
      forgotEmail: event.toLowerCase()
    });
  };
  //=========================================================

  // State can be passed to the backend for auth -Justin
  handleFormSubmit = event => {
    console.log(this.state);
    this.setState({
      forgotEmail: this.state.forgotEmail
    });
    Actions.ForgotEmailSubmit();
  };

  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.header}>Forgot Password</Text>
        <Text style={Styles.paragraph}>
          Forgot the keys to the house huh? Don't worry, we've all been there.
          Enter your email below, we'll send you a reset link.
        </Text>

        <Logo />

        <Separator />
        <Separator />

        <View
          style={{
            height: 60,
            width: "115%",
            backgroundColor: "rgb(53,53,53)",
            color: "white",
            borderRadius: 5,
            alignSelf: "center",
            marginBottom: 10
          }}
        >
          <Text style={Styles.inputText}>Email</Text>
          <TextInput
            style={{
              marginLeft: 12,
              marginBottom: 16,
              fontSize: 18,
              color: "white"
            }}
            name="signUpEmail"
            autoCapitalize="none"
            returnKeyType="go"
            onChangeText={this.handleEmailChange}
            forgotEmail={this.state.forgotEmail}
            keyboardType="email-address"
          />
        </View>

        <Separator />
        <Separator />

        <Button
          style={{
            height: 50,
            width: "115%",
            alignSelf: "center",
            borderRadius: 50,
            backgroundColor: "#1F4CC6",
            marginBottom: 50
          }}
          onPress={this.handleFormSubmit}
        >
          <Text style={Styles.buttonText}>Send Reset Link</Text>
        </Button>
      </View>
    );
  }
}

export default ForgotEmail;
