import React from "react";
import { StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { Card } from "react-native-paper";

import Welcome from "./components/entry";
import WelcomeImage from "./components/picture";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Welcome />
        </Card>
        <Card style={styles.card}>
          <WelcomeImage />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    bottom: 0
  }
});
