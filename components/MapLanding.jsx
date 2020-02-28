import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Text, View, Slider, Button, KeyboardAvoidingView } from "react-native";
import Styles from "../css/styles";
import { ScrollView } from "react-native-gesture-handler";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

class MapLanding extends Component {
  state = {
    location: {},
    region: {}
  };

  componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });
    this.setState({ location });
    this.setState({
      region: {
        latitude: this.state.location.coords.latitude,
        longitude: this.state.location.coords.longitude
      }
    });
    console.log(this.state.region);
    console.log(this.state.location);
  };

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
              {/* <Button style={Styles.Nav} title="Nav"></Button> */}
            </MapView>
            <View style={Styles.textContainer}>
              <Text style={Styles.mapUI}>Your Family:</Text>
              <View style={Styles.family}></View>
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
