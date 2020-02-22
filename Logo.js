import React from "react";
import { Image, StyleSheet } from "react-native";

const Logo = () => {
  return (
    <Image source={require("./assets/SentinelLogo.png")} style={styles.image} />
  );
};

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 150,
    left: 82
  }
});
export default Logo;
