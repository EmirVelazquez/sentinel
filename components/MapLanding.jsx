import React, { Component } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Styles from "../css/styles";

class MapLanding extends Component {
  render() {
    return (
      <View style={Styles.mapContainer}>
        <MapView style={Styles.mapStyle} />
        <View style={Styles.textContainer}>
          <Text style={Styles.mapUI}>Your Family:</Text>
        </View>
      </View>
    );
  }
}

export default MapLanding;
