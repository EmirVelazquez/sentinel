import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Text, View, Slider, KeyboardAvoidingView } from "react-native";
import Styles from "../css/styles";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Button from "apsl-react-native-button";

class MapLanding extends Component {
  state = {
    users: [
      {
        name: "User1",
        coordinate: {
          long: -96.78,
          lat: 32.7844
        }
      },
      {
        name: "User2",
        coordinate: {
          long: -96.7845,
          lat: 32.8412
        }
      }
    ],
    location: {},
    region: {
      latitude: 32.7473,
      longitude: -97.0945,
      latitudeDelta: 0.05,
      longitudeDelta: 0.09
    }
  };

  // componentDidMount() {
  //   if (Platform.OS === "android" && !Constants.isDevice) {
  //     this.setState({
  //       errorMessage:
  //         "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
  //     });
  //   } else {
  //     this._getLocationAsync();
  //   }
  // }

  // _getLocationAsync = async () => {
  //   let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status !== "granted") {
  //     this.setState({
  //       errorMessage: "Permission to access location was denied"
  //     });
  //   }

  //   let location = await Location.getCurrentPositionAsync({
  //     enableHighAccuracy: true
  //   });
  //   this.setState({ location });
  //   this.setState({
  //     region: {
  //       latitude: this.state.location.coords.latitude,
  //       longitude: this.state.location.coords.longitude,
  //       latitudeDelta: 0.08,
  //       longitudeDelta: 0.45
  //     }
  //   });

  //   console.log(this.state.location);
  // };

  // onPress events
  //=========================================================
  Emergency = event => {
    if (event == 0) {
      console.log("Changed to: " + event + " No Emergency");
    } else {
      console.log("Changed to: " + event + " Emergency Logged");
    }
  };

  UserPress = () => {
    console.log("A User's location was requested");
  };
  //=========================================================

  // Conditional Rendering
  //=========================================================
  IsLogged = props => {
    if (this.state.users[0]) {
      return (
        <View>
          <View style={Styles.textContainer}>
            <Text style={Styles.mapUI}> Group:</Text>
          </View>
          <View style={Styles.family}>
            {this.state.users.map((user, i) => {
              return (
                <TouchableOpacity onPress={this.UserPress} style={Styles.users}>
                  <View style={Styles.userImage} />
                  <Text name={this.state.users[i].name} style={Styles.userText}>
                    {this.state.users[i].name}
                  </Text>
                </TouchableOpacity>
              );
            })}
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
    } else {
      return (
        <View style={Styles.noUsersContainer}>
          <Button
            style={{
              position: "absolute",
              height: 50,
              width: "90%",
              alignSelf: "center",
              borderRadius: 50,
              backgroundColor: "#1F4CC6",
              top: 30,
              paddingLeft: 50,
              paddingRight: 50
            }}
            onPress={this.CreateGroupModal}
          >
            <Text style={Styles.buttonText}>Create Group</Text>
          </Button>
        </View>
      );
    }
  };

  mapRender = () => {
    if (this.state.users[0]) {
      return (
        <MapView
          style={Styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          // region={this.state.region}
        >
          {/* <Button style={Styles.Nav} title="Nav"></Button> */}

          {this.state.users.map((user, i) => {
            return (
              <MapView.Marker
                title={user.name}
                key={i}
                description="description"
                coordinate={{
                  latitude: user.coordinate.lat,
                  longitude: user.coordinate.long
                }}
              />
            );
          })}
        </MapView>
      );
    } else {
      return (
        <MapView
          style={Styles.mapStyleNotLogged}
          provider={PROVIDER_GOOGLE}
          // region={this.state.region}
        >
          {/* <Button style={Styles.Nav} title="Nav"></Button> */}

          {this.state.users.map((user, i) => {
            return (
              <MapView.Marker
                title={user.name}
                key={i}
                description="description"
                coordinate={{
                  latitude: user.coordinate.lat,
                  longitude: user.coordinate.long
                }}
              />
            );
          })}
        </MapView>
      );
    }
  };
  //=========================================================

  render() {
    return (
      <View style={Styles.mapContainer}>
        <this.mapRender />
        <View style={Styles.textContainer}>
          <this.IsLogged />
        </View>
      </View>
    );
  }
}

export default MapLanding;
