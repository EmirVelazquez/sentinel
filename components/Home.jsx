import React, { Component } from "react";
import { Text, View, TextInput, KeyboardAvoidingView } from "react-native";
import { Actions } from "react-native-router-flux";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

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
    //=========================================================
  };

  //Routing
  //=========================================================
  goToSignUp = () => {
    Actions.SignUp();
  };
  //=========================================================

  render() {
    return (
      <KeyboardAvoidingView behavior="position">
        <ScrollView>
          <View style={Styles.container}>
            <Logo />

            <Text style={Styles.header}>Sentinel</Text>
            <Text style={Styles.paragraph}>Please sign in to continue</Text>

            <Separator />
            <Separator />

            <TextInput
              name="email"
              placeholder="Email"
              style={{
                height: 45,
                backgroundColor: "rgb(53,53,53)",
                color: "white",
                borderRadius: 5
              }}
              onChangeText={this.handleEmailChange}
              email={this.state.email}
              keyboardType="email-address"
            />

            <Separator />

            <TextInput
              name="password"
              placeholder="Password"
              style={{
                height: 45,
                backgroundColor: "rgb(53,53,53)",
                color: "white",
                borderRadius: 5
              }}
              type="password"
              onChangeText={this.handlePasswordChange}
              password={this.state.password}
              secureTextEntry={this.state.hidePassword}
            />

            <Separator />
            <Separator />

            <TouchableOpacity
              style={Styles.button}
              onPress={this.handleFormSubmit}
            >
              <Text style={Styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Separator />
            <Separator />
            <Separator />
            <Separator />
            <Separator />

            <View
              style={{ position: "absolute", left: 0, right: 0, bottom: 10 }}
            >
              <TouchableOpacity
                style={Styles.smButton}
                onPress={this.goToSignUp}
              >
                <Text style={Styles.smButtonText}>
                  Don't have an account? Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default Home;
