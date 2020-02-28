import React, { Component } from "react";
import MapView from "react-native-maps";
import { Text, View, Slider, Button, KeyboardAvoidingView } from "react-native";
import Styles from "../css/styles";
import { ScrollView } from "react-native-gesture-handler";
import { Location } from "expo-location";
import { Permissions } from "expo-permissions";

class MapLanding extends Component {

  state = {
    location: {}
  }

  getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      console.log("not granted")
    }

    const location = await Location.getCurrentPositionAsync();

    console.log(this.state.location)
    this.setState({
      location: this.state.location
    })
  }

  Emergency = event => {
    if (event == 0) {
      console.log("Changed to: " + event + " No Emergency");
    } else {
      console.log("Changed to: " + event + " Emergency Logged");
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="position">
        <ScrollView>
          <View style={Styles.mapContainer}>
            <MapView style={Styles.mapStyle}>
              <Button style={Styles.Nav} title="Nav"></Button>
            </MapView>
            <View style={Styles.textContainer}>
              <Text style={Styles.mapUI}>Your Family:</Text>
              <View style={Styles.family}>
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
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default MapLanding;
