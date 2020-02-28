import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Image,
  AsyncStorage
} from "react-native";
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

  test() {

    // e.preventDefault();
    var url = 'http://71.128.244.19:8081/api/user';
    axios.post(url, {
      first_name: this.state.signUpFName,
      last_name: this.state.signUpLName,
      email: this.state.signUpEmail,
      password: this.state.signUpPassword
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

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
    this.test();
    // User info gets sent to database and is verified, then we send them to the maplanding page
    Actions.MapLanding();
  };

  managePasswordVisability = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="position">
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

            <View style={{
              height: 60,
              width: "115%",
              backgroundColor: "rgb(53,53,53)",
              color: "white",
              borderRadius: 5,
              alignSelf: "center",
              marginBottom: 10
            }}>
              <Text style={{
                marginLeft: 12,
                fontSize: 12,
                marginTop: 9,
                marginBottom: 12,
                color: "#8D8C8C"
              }}>First Name</Text>
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

            <View style={{
              height: 60,
              width: "115%",
              backgroundColor: "rgb(53,53,53)",
              color: "white",
              borderRadius: 5,
              alignSelf: "center",
              marginBottom: 10
            }}>
              <Text style={{
                marginLeft: 12,
                fontSize: 12,
                marginTop: 9,
                marginBottom: 12,
                color: "#8D8C8C"
              }}>Last Name</Text>
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

            <View style={{
              height: 60,
              width: "115%",
              backgroundColor: "rgb(53,53,53)",
              color: "white",
              borderRadius: 5,
              alignSelf: "center",
              marginBottom: 10
            }}>
              <Text style={{
                marginLeft: 12,
                fontSize: 12,
                marginTop: 9,
                marginBottom: 12,
                color: "#8D8C8C"
              }}>Email</Text>
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

            <View style={{
              height: 60,
              width: "115%",
              backgroundColor: "rgb(53,53,53)",
              color: "white",
              borderRadius: 5,
              alignSelf: "center",
              marginBottom: 22
            }}>
              <Text style={{
                marginLeft: 12,
                fontSize: 12,
                marginTop: 9,
                marginBottom: 12,
                color: "#8D8C8C"
              }}>Password</Text>
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
            <View style={{ width: "115%", alignSelf: "center", }}>
              <Text style={{
                color: "#8D8C8C", marginBottom: 11, marginLeft: 12,
                fontSize: 12,
              }}>Account Completion 0%</Text>
              <Image
                source={require("../assets/completeZero.png")}
                style={{ width: "100%", borderRadius: 50, height: 8, marginBottom: 31 }}></Image>
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

            <View style={{ position: "absolute", left: 0, right: 0, bottom: 10 }}>
              <TouchableOpacity
                style={Styles.smButton}
                onPress={this.goToInformation}
              >
                <Text style={Styles.smButtonText}>
                  How will we use your information? Learn More
            </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default SignUp;
