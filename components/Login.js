import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import Styles from "../css/styles";
import Separator from "./Separator";
import { ScrollView } from "react-native-gesture-handler";

class LogIn extends Component {
  //Retrieving input data
  state = {
    email: "",
    password: "",
    hidePassword: true
  };

  //Individual onChange handlers for each part of state
  //=========================================================
  handleEmailChange = event => {
    console.log(event);
    this.setState({
      email: event
    });
  };

  handlePasswordChange = event => {
    console.log(event);

    this.setState({
      password: event
    });
  };
  //=========================================================

  // State can be passed to the backend for auth -Justin
  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    this.setState({
      email: this.state.email,
      password: this.state.password
    });
  };

  managePasswordVisability = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };

  render() {
    return (
      <ScrollView>
        <View style={Styles.container}>
          <Text style={Styles.header}>Log In</Text>

          <Separator />
          <Separator />
          <Separator />

          <TextInput
            name="email"
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
            onChangeText={this.handleEmailChange}
            email={this.state.email}
          />

          <Separator />
          <TextInput
            name="password"
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
            type="password"
            onChangeText={this.handlePasswordChange}
            password={this.state.password}
            secureTextEntry={this.state.hidePassword}
          />
          <Separator />

          <Button
            title="Show Password"
            color="black"
            onPress={this.managePasswordVisability}
          />
          <Separator />

          <Button title="Submit" onPress={this.handleFormSubmit} />
        </View>
        <Button title="Show Password" onPress={this.managePasswordVisability} />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({});

export default LogIn;
