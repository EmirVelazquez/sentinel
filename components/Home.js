import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Actions } from "react-native-router-flux";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import Logo from "./Logo";
import Styles from "../css/styles";

const Home = () => {
  // Funtion Helper for spacing
  function Separator() {
    return <View style={styles.separator} />;
  }

  const goToLogIn = () => {
    Actions.LogIn();
  };

  const goToSignUp = () => {
    Actions.SignUp();
  };

  return (
    <ScrollView>
      <View style={Styles.container}>
        <Logo />
        <Text style={Styles.header}>Sentinel</Text>
        <View style={styles.fixToText}>
          <NavigationContainer>
            <Button
              titleStyle={{ color: "white" }}
              buttonStyle={{
                borderColor: "white",
                borderWidth: 2,
                borderRadius: 10
              }}
              type="outline"
              title="Log In"
              onPress={goToLogIn}
            />
            <Separator />
            <Button
              titleStyle={{ color: "white" }}
              buttonStyle={{
                borderColor: "white",
                borderWidth: 2,
                borderRadius: 10
              }}
              type="outline"
              title="Sign Up"
              onPress={goToSignUp}
            />
          </NavigationContainer>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fixToText: {
    justifyContent: "center",
    height: 55,
    top: 220
  },
  separator: {
    marginVertical: 8
  },
  btn: {
    backgroundColor: "white"
  }
});

export default Home;
