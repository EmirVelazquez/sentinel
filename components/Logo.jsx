import React from "react";
import { Image, StyleSheet } from "react-native";

// Individual component for rendering the Logo
const Logo = () => {
  return (
    <Image
      source={require("../assets/sentinelHighRes.png")}
      style={styles.image}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: 190,
    width: 190,
    marginLeft: "auto",
    marginRight: "auto"
  }
});
export default Logo;
