import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Text, View, Slider, TouchableOpacity, Dimensions, AsyncStorage, Image, Fragment } from "react-native";
import Styles from "./../../css/styles";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { GOOGLE_API_KEY } from "react-native-dotenv";

class MapLanding extends Component {
  state = {
    user: {
      name: "User",
      coordinate: {},
      pinColor: "#ff0000",
      groupName: "SMU Class", // Using this to test when the user has a created a group - Emir
      // groupName: "", // Using this to test when the user has not created a group - Emir
    },
    group: [
      {
        first_name: "Ricky",
        last_name: "Bobby",
        coordinate: {
          longitude: -96.78,
          latitude: 32.7844
        },
        pinColor: "#1F4CC6"
      },
      {
        first_name: "Forrest",
        last_name: "Gump",
        coordinate: {
          longitude: -96.8419,
          latitude: 32.8173
        },
        pinColor: "#8D8C8C"
      },
      {
        first_name: "Michael",
        last_name: "Scott",
        coordinate: {
          longitude: -96.7812,
          latitude: 32.8252
        },
        pinColor: "#7F1DE1"
      }
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

  //============================================================
  // Google Maps Section (Use this section Cole...Please - Emir)
  //============================================================
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
      user: {
        coordinate: {
          latitude: this.state.location.coords.latitude,
          longitude: this.state.location.coords.longitude
        }
      }
    });
    this.setState({
      region: {
        latitude: this.state.location.coords.latitude,
        longitude: this.state.location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.35
      }
    });
    console.log(this.state.location);
  };

  _getLocationAsync = async () => {
    const location = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 250,
      },
      newLocation => {
        let coords = newLocation.coords;

        this.setState({
          location: {
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.08,
            longitudeDelta: 0.45
          }
        });
      },
      error => console.log(error)
    );
    return location;
  };

  //=========================================================
  // Methods Being Used For Client Side Requests 
  //=========================================================
  // Method to get email from sign up or log in page
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
  // Method for User to Request Group Member's Position on Map
  UserPress = () => {
    console.log("A User's location was requested");
  };
  // Method for user to create a new group, will render a modal
  CreateGroupModal = () => {
    console.log("User Wants to Create a New Group");
    console.log("==>Modal Pops");
  };
  // Method for user to add a waypoint
  addWayPoint = () => {
    console.log("User Wants to add a Waypoint"); // Currently logging press until Cole Adds functionality - Emir
  }
  // Method for user to add group member
  addGroupMember = () => {
    console.log("User Wants to add a group member"); // Currently logging after press
  }
  // Method For Sliider When User Creates An Emergency Alert for Group
  Emergency = event => {
    if (event === 0) {
      console.log(event + "= No Emergency");
    } else {
      console.log(event + "= User has created an Emergency Alert.");
    }
  };

  //=========================================================
  // Method Used to Change Layout Based on Group Existing (Use this section Justin...please - Emir)
  //=========================================================
  updateLandingPageMap = () => {
    if (this.state.user.groupName === "") {
      return (
        // This is how we make a react native fragment <>
        <>
          <MapView
            style={Styles.userHasNoGroup}
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
            <MapView.Marker
              title={this.state.user.name}
              key="Main user"
              coordinate={this.state.user.coordinate}
              pinColor={this.state.user.pinColor}
            />
          </MapView>
          <View style={Styles.noUsersContainer}>
            <TouchableOpacity
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
            </TouchableOpacity>
          </View>
        </>
        // Closing the fragment </>
      );
    } else {
      return (
        // This is how we make a react native fragment <>
        <>
          <MapView
            style={Styles.userHasGroup}
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
            <MapView.Marker
              title={this.state.user.name}
              key="Main user"
              coordinate={this.state.user.coordinate}
              pinColor={this.state.user.pinColor}
            />

            {/* THIS IS WAYPOINT MARKER */}
            <MapView.Marker
              title={this.state.waypoint.name}
              key="waypoint"
              coordinate={this.state.waypoint.coordinate}
              pinColor={this.state.waypoint.pinColor}
            />

            {/* THIS IS THE GROUP MEMBERS MARKER */}
            {this.state.group.map((member, i) => {
              return (
                <MapView.Marker
                  title={member.name}
                  key={i}
                  coordinate={member.coordinate}
                  pinColor={member.pinColor}
                />
              );
            })}

            {/* {mapViewDirection} */}
          </MapView>
          <View // Container to hold buttons
            style={{
              position: "absolute",
              top: Dimensions.get("window").height - 360,
              left: Dimensions.get("window").width - 65,
              zIndex: 2
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                height: 50,
                width: 50,
                borderRadius: 50,
                marginBottom: 12,
                shadowColor: "#000000",
                shadowOpacity: 0.5,
                elevation: 6,
                shadowRadius: 5,
                shadowOffset: { width: 1, height: 5 },
                justifyContent: "center"
              }}
              onPress={this.addWayPoint}>
              <Image source={require("../../assets/addWaypoint.png")} style={{ width: 16, height: 24, marginLeft: "auto", marginRight: "auto", marginTop: "15%" }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                height: 50,
                width: 50,
                borderRadius: 50,
                justifyContent: "center"
              }}
              onPress={this.addGroupMember}>
              <Image source={require("../../assets/addMember.png")} style={{ width: 24, height: 18, marginLeft: "auto", marginRight: "auto", marginTop: "2%" }} />
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: "transparent" }}>
            <View style={Styles.textContainer}>
              <Text style={Styles.mapUI}> Group Members</Text>
            </View>
            <View style={Styles.family}>
              {this.state.group.map((member, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={this.UserPress}
                    style={Styles.users}
                  >
                    <View style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 50,
                      alignSelf: "center",
                      borderColor: `${member.pinColor}`, // Taking the color from the state - Emir
                      borderWidth: 2,
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      {/* Taking the full name initials and setting inside circle - Emir */}
                      <Text style={{ color: "#FFFFFF" }}>{member.first_name.charAt(0)}{member.last_name.charAt(0)}</Text>
                    </View>
                    <Text style={Styles.userText}>
                      {member.first_name}
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
        </>
        // Closing the fragment </>
      );
    }
  };

  //=========================================================
  // RENDER METHOD for mounting component
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
        {/* This calls the method to render the layout based on group state */}
        <this.updateLandingPageMap />
      </View>
    );
  }
}

export default MapLanding;
