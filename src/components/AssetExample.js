import * as React from "react";
import { Button, Alert, Text, View, StyleSheet, Image } from "react-native";

export default class AssetExample extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to Shepard</Text>
        <Text style={styles.paragraph}>
          Make sure you keep track of your family when it matters most.
        </Text>
        <Image
          style={styles.image}
          source={require("../assets/snack-icon.png")}
        />

        <Button
          title="Press me"
          onPress={() => Alert.alert("Simple Button pressed")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },
  header: {
    margin: 24,
    marginTop: 0,
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center"
  },
  paragraph: {
    fontSize: 17,
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 14
  },
  image: {
    marginBottom: 14,
    height: 128,
    width: 128
  }
});
