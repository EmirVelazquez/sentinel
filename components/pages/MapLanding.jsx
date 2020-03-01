import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Text, View, Slider, TouchableOpacity, Dimensions, AsyncStorage } from "react-native";
import Button from "apsl-react-native-button";
import Styles from "./../../css/styles";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { GOOGLE_API_KEY } from "react-native-dotenv";

class MapLanding extends Component {
  state = {
    user: {
      name: "User",
      coordinate: {},
      pinColor: "#ff0000"
    },
    group: [
      // {
      //   name: "GroupMem1",
      //   coordinate: {
      //     longitude: -96.78,
      //     latitude: 32.7844
      //   },
      //   pinColor: "#ffff33"
      // },
      // {
      //   name: "GroupMem2",
      //   coordinate: {
      //     longitude: -96.8419,
      //     latitude: 32.8173
      //   },
      //   pinColor: "#1bcbc0"
      // }
    ],
    waypoint: {
      name: "waypoint",
      coordinate: {},
      pinColor: "#0000ff"
    },
    location: {},
    region: {
      latitude: 32.7473,
      longitude: -97.0945,
      latitudeDelta: 0.05,
      longitudeDelta: 0.09
    }
  };

  // function to get email from sign up or log in page
  //========================================================
  getEmail = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      console.log("!!!!!!!!!!!!!!!!!!", value);
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  // this calls the asyncStorage function
  componentDidMount() {
    this.getEmail();
  }

  //============================================================

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
  //     user: {
  //       coordinate: {
  //         latitude: this.state.location.coords.latitude,
  //         longitude: this.state.location.coords.longitude
  //       }
  //     }
  //   });
  //   this.setState({
  //     region: {
  //       latitude: this.state.location.coords.latitude,
  //       longitude: this.state.location.coords.longitude,
  //       latitudeDelta: 0.01,
  //       longitudeDelta: 0.35
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

  CreateGroupModal = () => {
    console.log("A User is creating a new group");
  };
  //=========================================================

  // Conditional Rendering
  //=========================================================
  IsLogged = props => {
    if (this.state.group[0]) {
      return (
        <View>
          <View style={Styles.textContainer}>
            <Text style={Styles.mapUI}> Group:</Text>
          </View>
          <View style={Styles.family}>
            {this.state.group.map((member, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={this.UserPress}
                  style={Styles.users}
                >
                  <View style={Styles.userImage} />
                  <Text name={member.name} style={Styles.userText}>
                    {member.name}
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

  renderMapNotLogged = () => {
    if (this.state.group[0]) {
      return (
        <MapView
          style={Styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          region={this.state.region}
          onPress={e => {
            console.log(e.nativeEvent.coordinate);
            this.setState({
              waypoint: { coordinate: e.nativeEvent.coordinate }
            });
          }}
        >
          {/* THIS IS MAIN USER MARKER */}
          {/* <MapView.Marker
            title={this.state.user.name}
            key="Main user"
            coordinate={this.state.user.coordinate}
            pinColor={this.state.user.pinColor}
          /> */}
          {/* THIS IS WAYPOINT MARKER */}
          {/* <MapView.Marker
            title={this.state.waypoint.name}
            key="waypoint"
            coordinate={this.state.waypoint.coordinate}
            pinColor={this.state.waypoint.pinColor}
          /> */}
          {/* <Button style={Styles.Nav} title="Nav"></Button> */}

          {/* THIS IS THE GROUP MEMBERS MARKER */}
          {/* {this.state.group.map((member, i) => {
            return (
              <MapView.Marker
                title={member.name}
                key={i}
                coordinate={member.coordinate}
                pinColor={member.pinColor}
              />
            );
          })} */}

          {/* {mapViewDirection} */}
        </MapView>
      );
    } else {
      return (
        <MapView
          style={Styles.mapStyleNotLogged}
          provider={PROVIDER_GOOGLE}
          region={this.state.region}
          onPress={e => {
            console.log(e.nativeEvent.coordinate);
            this.setState({
              waypoint: { coordinate: e.nativeEvent.coordinate }
            });
          }}
        >
          {/* THIS IS MAIN USER MARKER */}
          {/* <MapView.Marker
            title={this.state.user.name}
            key="Main user"
            coordinate={this.state.user.coordinate}
            pinColor={this.state.user.pinColor}
          /> */}
          {/* THIS IS WAYPOINT MARKER */}
          {/* <MapView.Marker
            title={this.state.waypoint.name}
            key="waypoint"
            coordinate={this.state.waypoint.coordinate}
            pinColor={this.state.waypoint.pinColor}
          /> */}
          {/* <Button style={Styles.Nav} title="Nav"></Button> */}

          {/* THIS IS THE GROUP MEMBERS MARKER */}
          {/* {this.state.group.map((member, i) => {
            return (
              <MapView.Marker
                title={member.name}
                key={i}
                coordinate={member.coordinate}
                pinColor={member.pinColor}
              />
            );
          })} */}

          {/* {mapViewDirection} */}
        </MapView>
      );
    }
  };

  buttonRender = () => {
    if (this.state.group[0]) {
      return (
        <Button
          style={{
            position: "absolute",
            backgroundColor: "white",
            height: 50,
            width: 50,
            borderRadius: 50,
            top: Dimensions.get("window").height * 0.54,
            left: Dimensions.get("window").width - 65
          }}
        />
      );
    } else {
      return <View style={{ backgroundColor: "transparent" }} />;
    }
  };
  //=========================================================

  // _getLocationAsync = async () => {
  //   const location = await Location.watchPositionAsync(
  //     {
  //       enableHighAccuracy: true,
  //       distanceInterval: 250,
  //     },
  //     newLocation => {
  //       let coords = newLocation.coords;

  //       this.setState({
  //         location: {
  //           latitude: coords.latitude,
  //           longitude: coords.longitude,
  //           latitudeDelta: 0.08,
  //           longitudeDelta: 0.45
  //         }
  //       });
  //     },
  //     error => console.log(error)
  //   );
  //   return location;
  // };

  Emergency = event => {
    if (event == 0) {
      console.log("Changed to: " + event + " No Emergency");
    } else {
      return (
        <MapView
          style={Styles.mapStyleNotLogged}
          provider={PROVIDER_GOOGLE}
          region={this.state.region}
        >
          {/* <Button style={Styles.Nav} title="Nav"></Button> */}

          {this.state.group.map((member, i) => {
            return (
              <MapView.Marker
                title={member.name}
                key={i}
                description="description"
                coordinate={{
                  latitude: member.coordinate.lat,
                  longitude: member.coordinate.long
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
    // This is making the directions to the waypoint
    let mapViewDirection = null;
    if (
      this.state.waypoint.coordinate.hasOwnProperty("latitude") &&
      this.state.waypoint.coordinate.hasOwnProperty("longitude")
    ) {
      mapViewDirection = (
        <MapViewDirections
          origin={this.state.user.coordinate}
          destination={this.state.waypoint.coordinate}
          apikey={GOOGLE_API_KEY}
          strokeWidth={2}
          strokeColor="red"
        />
      );
    }

    return (
      <View style={Styles.mapContainer}>
        <this.renderMapNotLogged />
        {/* THIS IS THE BUTTON FOR THE MAPVIEW */}
        <this.buttonRender />
        <View style={Styles.textContainer}>
          <this.IsLogged />
          <View style={Styles.family}></View>
        </View>
      </View>
    );
  }
}

export default MapLanding;
