import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";

export default class WelcomeImage extends React.Component {
  render() {
    return (
      <Image source={require("../assets/Sent.jpg")} style={styles.image} />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width
  }
});
