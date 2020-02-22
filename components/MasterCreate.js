import React, { Component } from "react";
import { Views, Text, StyleSheet, TextInput, Button, View } from "react-native";

import Styles from "../css/styles";
import Separator from "./Separator";

import { ScrollView } from "react-native-gesture-handler";

class MasterCreate extends Component {
  state = {
    fName: "",
    lName: "",
    addUsersNow: false
  };

  //Individual onChange handlers for each part of state
  //=========================================================
  handleFNameChange = event => {
    console.log("First Name Change: " + event);
    this.setState({
      fName: event
    });
  };

  handleLNameChange = event => {
    console.log("Last Name Change: " + event);
    this.setState({
      LName: event
    });
  };
  //=========================================================

  // State can be passed to the backend -Justin
  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    this.setState({
      fName: this.state.fName,
      lName: this.state.lName,
      addUsersNow: this.state.addUsersNow
    });
  };

  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.header}>Let's get to know each other</Text>
        <View style={Styles.innerContainer}>
          <TextInput
            name="fName"
            placeholder="First Name"
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
            onChangeText={this.handleFNameChange}
            fName={this.state.fName}
          />

          <Separator />

          <TextInput
            name="lName"
            placeholder="Last Name"
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
            onChangeText={this.handleLNameChange}
            lName={this.state.lName}
          />

          <Separator />
        </View>
      </View>
    );
  }
}
