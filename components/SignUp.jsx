import React, { Component } from "react";
import { View, Text, TextInput, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import Styles from "../css/styles";
import Separator from "./Separator";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import Button from "apsl-react-native-button";

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
      signUpFName: event.toLowerCase()
    });
  };

  handleSignUpLNameChange = event => {
    console.log("Last Name Change: " + event);
    this.setState({
      signUpLName: event.toLowerCase()
    });
  };

  handleSignupEmailChange = event => {
    console.log("Email Change: " + event);
    this.setState({
      signUpEmail: event.toLowerCase()
    });
  };

  handleSignUpPasswordChange = event => {
    console.log("Password Change: " + event);
    this.setState({
      signUpPassword: event.toLowerCase()
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
    // User info gets sent to database and is verified, then we send them to the maplanding page
    Actions.MapLanding();
  };

  managePasswordVisability = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };

  render() {
    return (
      // <KeyboardAvoidingView behavior="position">
      <ScrollView>
        <View style={Styles.container}>
          <Text style={Styles.header}>Welcome!</Text>
          <Text style={Styles.paragraph}>
            Please help us with some details to create your account
          </Text>

          <Separator />
          <Separator />
          <Separator />
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
            <Text style={Styles.inputText}>First Name</Text>
            <TextInput
              style={{
                marginLeft: 12,
                marginBottom: 16,
                fontSize: 18,
                color: "white"
              }}
              name="signUpFName"
              returnKeyType="next"
              onChangeText={this.handleSignUpFNameChange}
              signUpFName={this.state.signUpFName}
              onSubmitEditing={() => this.LNameInput.focus()}
            />
          </View>

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
            <Text style={Styles.inputText}>Last Name</Text>
            <TextInput
              style={{
                marginLeft: 12,
                marginBottom: 16,
                fontSize: 18,
                color: "white"
              }}
              name="signUpLName"
              returnKeyType="next"
              onChangeText={this.handleSignUpLNameChange}
              signUpLName={this.state.signUpLName}
              onSubmitEditing={() => this.emailInput.focus()}
              ref={input => (this.LNameInput = input)}
            />
          </View>

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
              returnKeyType="next"
              onChangeText={this.handleSignupEmailChange}
              signUpEmail={this.state.signUpEmail}
              keyboardType="email-address"
              onSubmitEditing={() => this.passwordInput.focus()}
              ref={input => (this.emailInput = input)}
            />
          </View>

          <View
            style={{
              height: 60,
              width: "115%",
              backgroundColor: "rgb(53,53,53)",
              color: "white",
              borderRadius: 5,
              alignSelf: "center",
              marginBottom: 22
            }}
          >
            <Text style={Styles.inputText}>Password</Text>
            <TextInput
              style={{
                marginLeft: 12,
                marginBottom: 16,
                fontSize: 18,
                color: "white"
              }}
              name="SignUpPassword"
              returnKeyType="go"
              onChangeText={this.handleSignUpPasswordChange}
              signUpPassword={this.state.signUpPassword}
              secureTextEntry={this.state.hidePassword}
              ref={input => (this.passwordInput = input)}
            />
          </View>
          <View style={{ width: "115%", alignSelf: "center" }}>
            <Text
              style={{
                color: "#8D8C8C",
                marginBottom: 11,
                marginLeft: 12,
                fontSize: 12
              }}
            >
              Account Completion:
            </Text>
            <Image
              source={require("../assets/completeZero.png")}
              style={{
                width: "100%",
                borderRadius: 50,
                height: 8,
                marginBottom: 31
              }}
            ></Image>
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
            <Text style={Styles.buttonText}>Submit</Text>
          </Button>

          <View style={Styles.smContainerView}>
            <TouchableOpacity
              style={{
                backgroundColor: "#121212",
                fontSize: 13,
                color: "rgb(90,89,89)",
                width: "17%",
                left: "65%"
              }}
              onPress={this.goToInformation}
            >
              <Text style={{ fontSize: 13, color: "#1BCBC0", bottom: 0.5 }}>
                Learn More
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 13,
                left: "15%",
                top: "-50%",
                color: "#8D8C8C",
                width: "49%"
              }}
            >
              How will we use your information?
            </Text>
          </View>
        </View>
      </ScrollView>
      // </KeyboardAvoidingView>
    );
  }
}

export default SignUp;
