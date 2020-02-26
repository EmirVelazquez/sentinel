import React, { Component } from "react";
import { View, Text, TextInput, KeyboardAvoidingView } from "react-native";
import { Actions } from "react-native-router-flux";

import Styles from "../css/styles";
import Separator from "./Separator";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

class SignUp extends Component {
  // Retrieving input data
  state = {
    signUpFName: "",
    signUpLName: "",
    signUpEmail: "",
    signUpPassword: "",
    hidePassword: true
  };

  goToInformation = () => {
    Actions.Information();
  };

  //Individual onChange handlers for each part of state
  //=========================================================
  handleSignUpFNameChange = event => {
    console.log("First Name Change: " + event);
    this.setState({
      signUpFName: event
    });
  };

  handleSignUpLNameChange = event => {
    console.log("Last Name Change: " + event);
    this.setState({
      signUpLName: event
    });
  };

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

  //=========================================================

  // State can be passed to the backend for auth -Justin
  handleFormSubmit = event => {
    console.log(this.state);
    this.setState({
      signUpEmail: this.state.signUpEmail,
      signUpPassword: this.state.signUpPassword
    });
    // this.goToSetUp();
  };

  managePasswordVisability = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };

  render() {
    return (
      <View style={Styles.container}>
        <ScrollView>
          <KeyboardAvoidingView style={Styles.kbav} behavior="position">
            <Text style={Styles.header}>Welcome!</Text>
            <Text style={Styles.paragraph}>
              Please help us with some details to create your account
            </Text>

            <Separator />
            <Separator />
            <Separator />
            <Separator />
            <Separator />

            <TextInput
              name="signUpFName"
              placeholder="First Name"
              style={{
                height: 45,
                backgroundColor: "rgb(53,53,53)",
                color: "white",
                borderRadius: 5
              }}
              returnKeyType="next"
              onChangeText={this.handleSignUpFNameChange}
              signUpFName={this.state.signUpFName}
              onSubmitEditing={() => this.LNameInput.focus()}
            />

            <Separator />

            <TextInput
              name="signUpLName"
              placeholder="Last Name"
              style={{
                height: 45,
                backgroundColor: "rgb(53,53,53)",
                color: "white",
                borderRadius: 5
              }}
              returnKeyType="next"
              onChangeText={this.handleSignUpLNameChange}
              signUpLName={this.state.signUpLName}
              onSubmitEditing={() => this.emailInput.focus()}
              ref={input => (this.LNameInput = input)}
            />

            <Separator />

            <TextInput
              name="signUpEmail"
              placeholder="Email"
              style={{
                height: 45,
                backgroundColor: "rgb(53,53,53)",
                color: "white",
                borderRadius: 5
              }}
              autoCapitalize="none"
              returnKeyType="next"
              onChangeText={this.handleSignupEmailChange}
              signUpEmail={this.state.signUpEmail}
              keyboardType="email-address"
              onSubmitEditing={() => this.passwordInput.focus()}
              ref={input => (this.emailInput = input)}
            />

            <Separator />

            <TextInput
              name="SignUpPassword"
              placeholder="Password"
              style={{
                height: 45,
                backgroundColor: "rgb(53,53,53)",
                color: "white",
                borderRadius: 5
              }}
              returnKeyType="go"
              onChangeText={this.handleSignUpPasswordChange}
              signUpPassword={this.state.signUpPassword}
              secureTextEntry={this.state.hidePassword}
              ref={input => (this.passwordInput = input)}
            />

            <Separator />
            <Separator />

            <TouchableOpacity
              style={Styles.button}
              onPress={this.handleFormSubmit}
            >
              <Text style={Styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <Separator />
            <Separator />
            <Separator />
            <Separator />
            <Separator />
            <Separator />
            <Separator />
            <Separator />

            <TouchableOpacity
              style={Styles.smButton}
              onPress={this.goToInformation}
            >
              <Text style={Styles.smButtonText}>
                How will we use your information? Learn More
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

export default SignUp;
