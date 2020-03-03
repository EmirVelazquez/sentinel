import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import {
  Text,
  View,
  Slider,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  Image,
  ScrollView,
  Modal,
  TextInput
} from "react-native";
import Styles from "./../../css/styles";
import Button from "apsl-react-native-button";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { GOOGLE_API_KEY } from "react-native-dotenv";
import axios from "axios";

class MapLanding extends Component {
  state = {
    newMemberFirstName: "",
    newMemberLastName: "",
    newMemberEmail: "",
    modalVisible: false,

    user: {
      name: "User",
      email: "",
      coordinate: {},
      pinColor: "#ff0000",
      groupName: "SMU Class" // Using this to test when the user has a created a group - Emir
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
      },
      {
        first_name: "Luke",
        last_name: "SkyWalker",
        coordinate: {
          longitude: -96.7912,
          latitude: 32.8552
        },
        pinColor: "#E9058E"
      },
      {
        first_name: "Rick",
        last_name: "Astley",
        coordinate: {
          longitude: -96.7712,
          latitude: 32.8152
        },
        pinColor: "#D74D00"
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
  //this get the current user info from data base
  //========================================================
  currentUser = (value) => {
    console.log(value);
    axios.get("https://sentinel-api.herokuapp.com/api/user/" + value)
      .then(res => {
        //this is calling the current loged in user
        console.log("this is the current user Data", res.data);
        if (res.data.GroupId) {

          // if the user has a groupId this will pull all the memebers innt the group
          axios.get("https://sentinel-api.herokuapp.com/api/user/group/" + res.data.GroupId)
            .then(res => {
              console.log("this is all the members in the group", res.data);
            })
        }
      })
  }

  //============================================================
  // function to create a new group
  // creatGroup = () => {
  //   axios.post("https://sentinel-api.herokuapp.com/api/group"{
  //     name: this.state.user.groupName
  //   })
  //     .then(res => {
  //       if (res.status === 200) {
  //         axios.put("https://sentinel-api.herokuapp.com/"{
  //           email: ,
  //           GroupId: res.data.id
  //         })
  //       }
  //     })
  // }


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
        distanceInterval: 250
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

      const value = await AsyncStorage.getItem("email");
      if (value !== null) {
        // We have data!!
        // console.log(value);
        this.currentUser(value);
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
    console.log("User Wants to Create a New Group... Opening Modal");
    this.setModalVisible(!this.state.modalVisible);
    console.log("Modal Opened");
  };
  // Method for user to add a waypoint
  addWayPoint = () => {
    console.log("User Wants to add a Waypoint"); // Currently logging press until Cole Adds functionality - Emir
  };
  // Method for user to add group member
  addGroupMember = () => {
    console.log("User Wants to add a group member... Opening Modal"); // Currently logging after press
    this.setModalVisible(!this.state.modalVisible);
    console.log("Modal Opened");
  };
  // Method For Slider When User Creates An Emergency Alert for Group
  Emergency = event => {
    if (event === 0) {
      console.log(event + "= No Emergency");
    } else {
      console.log(event + "= User has created an Emergency Alert.");
    }
  };

  //=========================================================
  //Modal Functions
  //=========================================================
  handleNewMemberFirstNameChange = event => {
    this.setState({
      newMemberFirstName: event.toLowerCase()
    });
    console.log("New Member First Name Change: " + event);
  };
  handleNewMemberLastNameChange = event => {
    this.setState({
      newMemberLastName: event.toLowerCase()
    });
    console.log("New Member Last Name Change: " + event);
  };
  handleNewMemberEmailChange = event => {
    this.setState({
      newMemberEmail: event.toLowerCase()
    });
    console.log("New Member Email Change: " + event);
  };

  handleFormSubmit = () => {
    // Add validation Logic
    this.setModalVisible(!this.state.modalVisible);
    console.log("Modal Closed");
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

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
            {/* <MapView.Marker
              title={this.state.user.name}
              key="Main user"
              coordinate={this.state.user.coordinate}
              pinColor={this.state.user.pinColor}
            /> */}
          </MapView>
          <View
            style={{
              // This is the Navbutton container
              position: "absolute",
              zIndex: 2,
              bottom: Dimensions.get("window").height - 75,
              right: Dimensions.get("window").width - 65
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#121212",
                opacity: 0.8,
                borderRadius: 4,
                height: 48,
                width: 54,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image // Hamburger Icon
                source={require("../../assets/openNav.png")}
                style={{
                  width: 22,
                  height: 16.2,
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={Styles.noUsersContainer}>
            <TouchableOpacity
              style={{
                position: "absolute",
                height: 50,
                width: "90%",
                alignSelf: "center",
                borderRadius: 50,
                backgroundColor: "#1F4CC6",
                marginTop: 20,
                marginBottom: 20,
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

          <View
            style={{
              // This is the Navbutton container
              position: "absolute",
              zIndex: 2,
              bottom: Dimensions.get("window").height - 75,
              right: Dimensions.get("window").width - 65
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#121212",
                opacity: 0.8,
                borderRadius: 4,
                height: 48,
                width: 54,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image // Hamburger Icon
                source={require("../../assets/openNav.png")}
                style={{
                  width: 22,
                  height: 16.2,
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              />
            </TouchableOpacity>
          </View>
          <View // Container to hold buttons for adding waypoints & new group members
            style={{
              position: "absolute",
              top: Dimensions.get("window").height * ".50",
              left: Dimensions.get("window").width - 65,
              zIndex: 2
            }}
          >
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
              onPress={this.addWayPoint}
            >
              <Image
                source={require("../../assets/addWaypoint.png")}
                style={{
                  width: 16,
                  height: 24,
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "15%"
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                height: 50,
                width: 50,
                borderRadius: 50,
                justifyContent: "center"
              }}
              onPress={this.addGroupMember}
            >
              <Image
                source={require("../../assets/addMember.png")}
                style={{
                  width: 24,
                  height: 18,
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "2%"
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: "transparent" }}>
            <View style={Styles.textContainer}>
              <Text style={Styles.mapUI}> Group Members</Text>
            </View>
            <ScrollView
              style={Styles.family}
              horizontal={true}
              snapToAlignment={"center"}
              decelerationRate={0}
            >
              {this.state.group.map((member, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={this.UserPress}
                    style={Styles.users}
                  >
                    <View
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 50,
                        alignSelf: "center",
                        borderColor: `${member.pinColor}`, // Taking the color from the state - Emir
                        borderWidth: 2,
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {/* Taking the full name initials and setting inside circle - Emir */}
                      <Text style={{ color: "#FFFFFF" }}>
                        {member.first_name.charAt(0)}
                        {member.last_name.charAt(0)}
                      </Text>
                    </View>
                    <Text style={Styles.userText}>{member.first_name}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
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
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          presentationStyle="overFullScreen"
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
            console.log("Modal Closed");
          }}
        >
          <View style={Styles.modalContainerBackground}>
            <View style={Styles.modalContainer}>
              <Text style={Styles.header}>New Member</Text>
              <View
                style={{
                  height: 60,
                  width: "115%",
                  backgroundColor: "rgb(53,53,53)",
                  color: "white",
                  borderRadius: 5,
                  alignSelf: "center",
                  marginBottom: 10,
                  marginTop: 10
                }}
              >
                <Text style={Styles.inputText}>First Name</Text>
                <TextInput
                  name="newMemberFirstName"
                  style={{
                    marginLeft: 12,
                    marginBottom: 16,
                    fontSize: 18,
                    color: "white",
                    height: 30,
                    width: "94%"
                  }}
                  onChangeText={this.handleNewMemberFirstNameChange}
                  newMemberFirstName={this.state.newMemberFirstName}
                  onSubmitEditing={() => this.newMemberLastName.focus()}
                ></TextInput>
              </View>
              <View
                style={{
                  height: 60,
                  width: "115%",
                  backgroundColor: "rgb(53,53,53)",
                  color: "white",
                  borderRadius: 5,
                  alignSelf: "center",
                  marginBottom: 10
                }}
              >
                <Text style={Styles.inputText}>Last Name</Text>
                <TextInput
                  name="newMemberLastName"
                  style={{
                    marginLeft: 12,
                    marginBottom: 16,
                    fontSize: 18,
                    color: "white",
                    height: 30,
                    width: "94%"
                  }}
                  onChangeText={this.handleNewMemberLastNameChange}
                  newMemberLastName={this.state.newMemberLastName}
                  onSubmitEditing={() => this.newMemberEmail.focus()}
                ></TextInput>
              </View>
              <View
                style={{
                  height: 60,
                  width: "115%",
                  backgroundColor: "rgb(53,53,53)",
                  color: "white",
                  borderRadius: 5,
                  alignSelf: "center",
                  marginBottom: 10
                }}
              >
                <Text style={Styles.inputText}>Email</Text>
                <TextInput
                  name="newMemberEmail"
                  style={{
                    marginLeft: 12,
                    marginBottom: 16,
                    fontSize: 18,
                    color: "white",
                    height: 30,
                    width: "94%"
                  }}
                  onChangeText={this.handleNewMemberEmailChange}
                  newMemberEmail={this.state.newMemberEmail}
                  keyboardType="email-address"
                ></TextInput>
              </View>
              <Button
                style={{
                  height: 50,
                  width: "115%",
                  alignSelf: "center",
                  borderRadius: 50,
                  backgroundColor: "#1F4CC6",
                  marginBottom: 50
                }}
                onPress={this.handleFormSubmit}
              >
                <Text style={Styles.buttonText}>Submit</Text>
              </Button>
            </View>
          </View>
        </Modal>
        {/* This calls the method to render the layout based on group state */}
        <this.updateLandingPageMap />
      </View>
    );
  }
}

export default MapLanding;
