import React from "react";
import { Button, Alert, Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

export default class Welcome extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to Sentinal</Text>
        <Text style={styles.paragraph}>
          Make sure you keep track of your family when it matters most.
        </Text>
        <View style={styles.fixToText}>
          <NavigationContainer>
            <Button
              style={styles.buttons}
              title="Sign Up"
              onPress={() => Alert.alert("Send to Sign Up")}
            />

            <Button
              style={styles.buttons}
              title="Log In"
              onPress={() => Alert.alert("Send to Log In")}
            />
          </NavigationContainer>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 0.2,
    backgroundColor: "black",
    opacity: 0.7,
    // height: 683
    bottom: 0
  },
  header: {
    margin: 24,
    marginTop: 0,
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  },
  paragraph: {
    fontSize: 17,
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 14,
    color: "white"
  },
  image: {
    marginBottom: 14,
    height: 128,
    width: 128
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttons: {}
});
