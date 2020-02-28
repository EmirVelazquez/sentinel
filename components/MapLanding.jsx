import React, { Component } from "react";
import MapView from "react-native-maps";
import { Text, View, Slider } from "react-native";
import Styles from "../css/styles";
import { ScrollView } from "react-native-gesture-handler";

class MapLanding extends Component {
  Emergency = event => {
    if (event == 0) {
      console.log("Changed to: " + event + " No Emergency");
    } else {
      console.log("Changed to: " + event + " Emergency Logged");
    }
  };
  render() {
    return (
      <View style={Styles.mapContainer}>
        <MapView style={Styles.mapStyle} />
        <View style={Styles.textContainer}>
          <Text style={Styles.mapUI}>Your Family:</Text>
          <View style={Styles.family}>
            <ScrollView>
              <Text></Text>
            </ScrollView>
          </View>
          <Slider
            style={Styles.switch}
            step={1}
            thumbTintColor="red"
            minimumTrackTintColor="red"
            minimumValue={0}
            maximumValue={1}
            onSlidingComplete={this.Emergency}
          ></Slider>
        </View>
      </View>
    );
  }
}

export default MapLanding;
