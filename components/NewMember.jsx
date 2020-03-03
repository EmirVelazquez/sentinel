import React, { Component } from "react";
import { View, Text, TextInput, Modal, TouchableHighlight } from "react-native";
import Styles from "../css/styles";
import Button from "apsl-react-native-button";

class NewMember extends Component {
  state = {
    newMemberFirstName: "",
    newMemberLastName: "",
    newMemberEmail: "",
    modalVisible: false
  };

  handleNewMemberFirstNameChange = event => {
    this.setState({
      newMemberFirstName: event.toLowerCase()
    });
    console.log("New Member First Name Change: " + event);
  };
  handleNewMemberLastNameChange = event => {
    this.setState({
      newMemberLastName: event.toLowerCase()
    });
    console.log("New Member Last Name Change: " + event);
  };
  handleNewMemberEmailChange = event => {
    this.setState({
      newMemberEmail: event.toLowerCase()
    });
    console.log("New Member Email Change: " + event);
  };

  handleFormSubmit = () => {
    this.setModalVisible(!this.state.modalVisible);
    console.log("Modal Closed");
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        presentationStyle="overFullScreen"
        onRequestClose={() => {
          this.setModalVisible(!this.state.modalVisible);
          console.log("Modal Closed");
        }}
      >
        <View style={Styles.modalContainer}>
          <Text style={Styles.header}>New Member</Text>
          <View
            style={{
              height: 60,
              width: "115%",
              backgroundColor: "rgb(53,53,53)",
              color: "white",
              borderRadius: 5,
              alignSelf: "center",
              marginBottom: 10,
              marginTop: 10
            }}
          >
            <Text style={Styles.inputText}>First Name</Text>
            <TextInput
              name="newMemberFirstName"
              style={{
                marginLeft: 12,
                marginBottom: 16,
                fontSize: 18,
                color: "white",
                height: 30,
                width: "94%"
              }}
              onChangeText={this.handleNewMemberFirstNameChange}
              newMemberFirstName={this.state.newMemberFirstName}
              onSubmitEditing={() => this.newMemberLastName.focus()}
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
              marginBottom: 10
            }}
          >
            <Text style={Styles.inputText}>Last Name</Text>
            <TextInput
              name="newMemberLastName"
              style={{
                marginLeft: 12,
                marginBottom: 16,
                fontSize: 18,
                color: "white",
                height: 30,
                width: "94%"
              }}
              onChangeText={this.handleNewMemberLastNameChange}
              newMemberLastName={this.state.newMemberLastName}
              onSubmitEditing={() => this.newMemberEmail.focus()}
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
              marginBottom: 10
            }}
          >
            <Text style={Styles.inputText}>Email</Text>
            <TextInput
              name="newMemberEmail"
              style={{
                marginLeft: 12,
                marginBottom: 16,
                fontSize: 18,
                color: "white",
                height: 30,
                width: "94%"
              }}
              onChangeText={this.handleNewMemberEmailChange}
              newMemberEmail={this.state.newMemberEmail}
              keyboardType="email-address"
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
            <Text style={Styles.buttonText}>Submit</Text>
          </Button>
        </View>
      </Modal>
    );
  }
}
export default NewMember;
