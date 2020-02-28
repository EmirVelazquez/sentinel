import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import { Actions } from "react-native-router-flux";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Button from "apsl-react-native-button";

import Logo from "./Logo";

import Styles from "../css/styles";
import Separator from "./Separator";

class Home extends Component {
  //Initializing state to capture input
  state = {
    email: "",
    password: "",
    hidePassword: true
  };

  // AsyncStorage function to store current user infomation
  //========================================================

  //========================================================

  //Individual onChange handlers for each part of state
  //=========================================================
  handleEmailChange = event => {
    console.log("Email Change: " + event);
    this.setState({
      email: event.toLowerCase()
    });
  };

  handlePasswordChange = event => {
    console.log("Password Change: " + event);
    this.setState({
      password: event.toLowerCase()
    });
  };
  //=========================================================

  //Password Visability Functions
  //=========================================================
  managePasswordVisability = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };
  //=========================================================

  // State can be passed to the backend for auth -Justin
  handleFormSubmit = event => {
    console.log(this.state);
    this.setState({
      email: this.state.email,
      password: this.state.password
    });

    //=========================================================
    //Insert logic for Authentication of characters
    Actions.MapLanding();
    //=========================================================
  };
  //=========================================================
  //Forgot email route:
  goToForgotEmail = () => {
    console.log("Forgot Password! Sending user to forgotPassword component");
    Actions.ForgotEmail();
  };

  //=========================================================

  //Routing
  //=========================================================
  goToSignUp = () => {
    Actions.SignUp();
  };
  //=========================================================

  render() {
    return (
      // <KeyboardAvoidingView behavior="position">
      <ScrollView>
        <View style={Styles.container}>
          <Logo />

          <Text style={Styles.header}>Sentinel</Text>
          <Text style={Styles.paragraph}>Please sign in to continue</Text>

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
              name="email"
              style={{
                marginLeft: 12,
                marginBottom: 16,
                fontSize: 18,
                color: "white"
              }}
              onChangeText={this.handleEmailChange}
              email={this.state.email}
              keyboardType="email-address"
              onSubmitEditing={() => this.passwordInput.focus()}
            ></TextInput>
          </View>

          <View
            style={{
              height: 60,
              width: "115%",
              backgroundColor: "rgb(53,53,53)",
              color: "white",
              borderRadius: 5,
              alignSelf: "center",
              marginBottom: 32,
              position: "relative"
            }}
          >
            <Text style={Styles.inputText}>Password</Text>
            <TouchableOpacity
              onPress={this.goToForgotEmail}
              style={{
                color: "#1BCBC0",
                top: -5,
                left: "80%",
                width: "15%",
                fontSize: 14,
                paddingBottom: 10
              }}
            >
              <Text style={{ color: "#1BCBC0" }}>FORGOT</Text>
            </TouchableOpacity>
            <TextInput
              name="password"
              style={{
                marginLeft: 12,
                marginBottom: 16,
                fontSize: 18,
                top: -25,
                width: "75%",
                color: "white"
              }}
              onChangeText={this.handlePasswordChange}
              password={this.state.password}
              secureTextEntry={this.state.hidePassword}
              ref={input => (this.passwordInput = input)}
            ></TextInput>
          </View>

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
            <Text style={Styles.buttonText}>Login</Text>
          </Button>
          <View style={Styles.smContainerView}>
            <TouchableOpacity
              style={{
                backgroundColor: "#121212",
                color: "rgb(90,89,89)",
                width: "10%",
                left: "62%",
                paddingTop: 10,
                paddingRight: 60
              }}
              onPress={this.goToSignUp}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: "#1BCBC0",
                  textAlign: "center",
                  width: 50,
                  bottom: 1
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 13,
                left: "27%",
                top: "-41%",
                color: "#8D8C8C",
                width: "33%"
              }}
            >
              Don't have an account?
            </Text>
          </View>
        </View>
      </ScrollView>
      // </KeyboardAvoidingView>
    );
  }
}

export default Home;
