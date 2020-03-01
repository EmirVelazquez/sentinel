import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import { TouchableOpacity } from "react-native-gesture-handler";

import Styles from "../css/styles";

class ForgotPasswordSubmit extends Component {
  goToLogin = () => {
    Actions.home();
  };

  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.headerCentered}>Forgot Password</Text>

        <Image
          source={require("../assets/sentinelMail.png")}
          style={styles.image}
        />
        <Text style={Styles.paragraphCentered}>Reset Email Sent</Text>
        <Text style={styles.smText}>
          Please check your email inbox for the password reset link.
        </Text>
        <TouchableOpacity
          onPress={this.goToLogin}
          style={{
            width: "41.5%",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <Text style={styles.smTextBlue}>Back To Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  image: {
    marginTop: "10%",
    height: "19%",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "15%"
  },

  smText: {
    color: "#8D8C8C",
    fontSize: 13,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    width: "64%",
    marginBottom: "5%"
  },

  smTextBlue: {
    color: "#1BCBC0",
    fontWeight: "bold",
    fontSize: 13,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    width: "64%"
  }
});

export default ForgotPasswordSubmit;
