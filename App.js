import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Routes from "./Routes";
import { render } from "react-dom";

export default function App() {
  return <Routes />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
