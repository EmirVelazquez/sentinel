import React, { Component } from "react";
import { Text, View, TextInput, KeyboardAvoidingView, AsyncStorage } from "react-native";
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
    fetch('https://sentinel-api.herokuapp.com/login/submit',
      {
        method: 'POST',
        body: this.state
      })
      .then(res => {
        console.log(res.status);
      });
    // console.log(this.state);
    this.setState({
      email: this.state.email,
      password: this.state.password
    });

    //=========================================================
    //Insert logic for Authentication of characters
    Actions.MapLanding();
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
              <TextInput name="email"
                style={{
                  marginLeft: 12,
                  marginBottom: 16,
                  fontSize: 18,
                  color: "white"
                }}
                onChangeText={this.handleEmailChange}
                email={this.state.email}
                keyboardType="email-address">
              </TextInput>
            </View>

            <View style={{
              height: 60,
              width: "115%",
              backgroundColor: "rgb(53,53,53)",
              color: "white",
              borderRadius: 5,
              alignSelf: "center",
              marginBottom: 32,
              position: "relative"
            }}>
              <Text style={{
                marginLeft: 12,
                fontSize: 12,
                marginTop: 9,
                marginBottom: 12,
                color: "#8D8C8C"
              }}>Password</Text>
              <Text style={{
                color: "#1BCBC0",
                position: "absolute",
                top: 30,
                right: 23,
                fontSize: 14
              }}>FORGOT</Text>
              <TextInput name="password"
                style={{
                  marginLeft: 12,
                  marginBottom: 16,
                  fontSize: 18,
                  color: "white"
                }}
                onChangeText={this.handlePasswordChange}
                password={this.state.password}
                secureTextEntry={this.state.hidePassword}>
              </TextInput>
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
            <View>
              <TouchableOpacity style={Styles.smButton} onPress={this.goToSignUp}>
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
