import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";

// You can import from local files
import AssetExample from "./components/AssetExample";

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Card>
          <AssetExample />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  }
});
