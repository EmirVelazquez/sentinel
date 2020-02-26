import React from "react";
import { Image, StyleSheet } from "react-native";

// Individual component for rendering the Logo
const Logo = () => {
  return (
    <Image
      source={require("../assets/logoShadow.png")}
      style={styles.image}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: 250,
    width: 250,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "20%"
  }
});
export default Logo;
