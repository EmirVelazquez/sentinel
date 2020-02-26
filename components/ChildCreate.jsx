import React, { Component } from "react";
import { Text, TextInput, Button, View } from "react-native";

import Styles from "../css/styles";
import Separator from "./Separator";
import { Actions } from "react-native-router-flux";

class SlaveCreate extends Component {
  state = {
    childFName: "",
    childLName: "",
    childEmail: ""
  };

  //Individual onChange handlers for each part of state
  //=========================================================
  handleChildFNameChange = event => {
    console.log("Child's First Name Change: " + event);
    this.setState({
      childFName: event
    });
  };
  handleChildLNameChange = event => {
    console.log("Child's Last Name Change: " + event);
    this.setState({
      childLName: event
    });
  };
  handleChildEmail = event => {
    console.log("Child's Email Change: " + event);
    this.setState({
      childEmail: event
    });
  };
  //=========================================================

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    this.setState({
      childFName: this.state.childFName,
      childLName: this.state.childLName,
      childEmail: this.state.childEmail
    });
  };
  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.header}>Children</Text>
        <View style={Styles.innerContainer}>
          <TextInput
            name="ChildFName"
            placeholder="Child's First Name"
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
            onChangeText={this.handleChildFNameChange}
            childFName={this.state.childFName}
          />
          <Separator />
          <TextInput
            name="ChildLName"
            placeholder="Child's Last Name"
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
            onChangeText={this.handleChildLNameChange}
            childFName={this.state.childLName}
          />

          <Separator />

          <TextInput
            name="ChildEmail"
            placeholder="Child's Email"
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
            onChangeText={this.handleChildEmail}
            childFName={this.state.childEmail}
          />

          <Separator />

          <Button title="Submit" onPress={this.handleFormSubmit} />
        </View>
      </View>
    );
  }
}
export default SlaveCreate;
