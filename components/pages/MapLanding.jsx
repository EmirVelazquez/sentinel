import React from "react";
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
import ValidationComponent from 'react-native-form-validator';

class MapLanding extends ValidationComponent {
  state = {
    //Member Data
    newMemberFirstName: "",
    newMemberLastName: "",
    newMemberEmail: "",

    //Group name Data
    newGroup: "",

    // Form validation
    newMemberFirstNameInput: true,
    newMemberLastNameInput: true,
    newMemberEmailInput: true,
    newGroupInput: true,
    // End form validation

          //Modal data
    modalVisible: false,
    modalVisible: false,

    //slider data
    slideValue: 0,

    //drawer data
    drawerOpen: false,
    user: {
      first_name: "Niki",
      last_name: "Lauda",
      coordinate: {},
      pinColor: "#ff0000",
      // groupName: "SMU Class" // Using this to test when the user has a created a group - Emir
      groupName: "" // Using this to test when the user has not created a group - Emir
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
  currentUser = value => {
    console.log(value);
    axios
      .get("https://sentinel-api.herokuapp.com/api/user/" + value)
      .then(res => {
        //this is calling the current loged in user
        console.log(res.data);
        if (res.data.GroupId) {
          axios
            .get(
              "https://sentinel-api.herokuapp.com/api/user/group/" +
                res.data.GroupId
            )
            .then(res => {
              console.log("this is all the members in the group", res.data);
            });
        }
      });
  };

  //============================================================

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
    console.log("modalVisible: " + this.state.modalVisible);
    console.log("modalVisible:" + this.state.modalVisible);
    console.log("Modal Opened");
  };
  // Method For Slider When User Creates An Emergency Alert for Group
  Emergency = event => {
    if (event < 50) {
      this.setState({ slideValue: event });
      console.log(this.state.slideValue + "= No Emergency");
    } else {
      console.log(event + "= User has created an Emergency Alert.");
      this.setState({ slideValue: event });
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
  handleNewGroupChange = event => {
    this.setState({
      newGroup: event.toLowerCase()
    });
    console.log("New Group Change: " + event);
  };
  // New member modal submit
  handleFormSubmit = () => {
    // Validating the form entries
    this.validate({
      newMemberFirstName: { minlength: 2, maxlength: 24, required: true },
      newMemberLastName: { minlength: 2, maxlength: 24, required: true },
      newMemberEmail: { email: true, required: true }
    });
    // Form entries are valid
    if (this.isFormValid()) {
      this.setModalVisible(!this.state.modalVisible);
      console.log("Modal Closed");
    }
    // Form validation response
    else {
      const fieldArray = ['newMemberFirstName', 'newMemberLastName', 'newMemberEmailInput'];
      // Looping through fields to see which is invalid
      fieldArray.map((field, i) => {
        // If error, change text
        if (this.isFieldInError(field)) {
          this.setState({ [field + 'Input']: false });
        }
        // No error, original text
        else {
          if (!this.isFieldInError(field)) {
            this.setState({ [field + 'Input']: true });
          }
        }
      });
    }
  }
  // New group modal submit
  handleGroupFormSubmit = () => {
    // Validating the form entry
    this.validate({
      newGroup: { minlength: 1, maxlength: 24, required: true },
    });
    // Form entry is valid
    if (this.isFormValid()) {
      this.setState({
        newGroupInput: true,
        user: { groupName: this.state.newGroup }
      });
      this.setModalVisible(!this.state.modalVisible);
      console.log("Modal Closed");
    }
    // Form entry is invalid
    else {
      this.setState({ newGroupInput: false });
    }
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });

  }

  closeModal = visible => {
    this.setState({ modalVisible: !visible });
  };

  slideReset = () => {
    if (this.state.slideValue < 50) this.setState({ slideValue: 0 });
  };


  //=========================================================
  // Method Used to Change Layout Based on Group Existing (Use this section Justin...please - Emir)
  //=========================================================
  updateLandingPageMap = () => {
    if (this.state.user.groupName === "") {
      return (
        // This is how we make a react native fragment <>
        <>
          {/* New Group Modal */}
          {/* ================================================================================================== */}
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
                <TouchableOpacity
                  style={{
                    height: 20,
                    width: 20,
                    top: 10,
                    left: "105%"
                    // backgroundColor: "red"
                  }}
                  onPress={this.closeModal}
                >
                  <Image
                    source={require("../../assets/closeNav.png")}
                    style={{
                      height: 20,
                      width: 20

                      // height: 20,
                      // width: 20,
                      // top: 10,
                      // left: "105%",
                      // backgroundColor: "white"
                    }}
                  />
                </TouchableOpacity>
                <Text style={Styles.header}>New Group</Text>
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
                  {this.state.newGroupInput ? (<Text style={Styles.inputText}>Group Name</Text>) : (<Text style={Styles.inputTextInvalid}>Invalid Group Name</Text>)}
                  <TextInput
                    name="newGroup"
                    style={{
                      marginLeft: 12,
                      marginBottom: 16,
                      fontSize: 18,
                      color: "white",
                      height: 30,
                      width: "94%"
                    }}
                    onChangeText={this.handleNewGroupChange}
                    newGroup={this.state.newGroup}
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
                  onPress={this.handleGroupFormSubmit}
                >
                  <Text style={Styles.buttonText}>Submit</Text>
                </Button>
              </View>
            </View>
          </Modal>
          {/* ================================================================================================== */}

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
            customMapStyle={mapTheme}
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
              onPress={this.toggleOpen}
            >
              <Image // Render Nav icon based on side drawer open state
                source={
                  this.state.drawerOpen
                    ? require("../../assets/closeNav.png")
                    : require("../../assets/openNav.png")
                }
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
      const width = Dimensions.get("window").width;
      const sliderStyle = {
        // asjust the color of the background
        sliderDummy: {
          backgroundColor: "#3F3F3F",
          // backgroundColor: "red",
          width: "90%",
          height: 50,
          borderRadius: 50,
          position: "absolute",
          opacity: 0.5
        },
        //adjust the color of the background slider
        //variable width
        sliderReal: {
          backgroundColor: "#DC2237",
          width:
            ((Dimensions.get("window").width * 0.9) / 50) *
            this.state.slideValue,
          height: 50,
          borderRadius: 50
        }
      };

      return (
        // This is how we make a react native fragment <>
        <>
          {/* modal */}
          {/* ========================================================== */}
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
                <TouchableOpacity
                  style={{
                    height: 20,
                    width: 20,
                    top: 10,
                    left: "105%"
                    // backgroundColor: "red"
                  }}
                  onPress={this.closeModal}
                >
                  <Image
                    source={require("../../assets/closeNav.png")}
                    style={{
                      height: 20,
                      width: 20

                      // height: 20,
                      // width: 20,
                      // top: 10,
                      // left: "105%",
                      // backgroundColor: "white"
                    }}
                  />
                </TouchableOpacity>
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
                  {this.state.newMemberFirstNameInput ? (<Text style={Styles.inputText}>First Name</Text>) : (<Text style={Styles.inputTextInvalid}>Invalid First Name</Text>)}
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
                  {this.state.newMemberLastNameInput ? (<Text style={Styles.inputText}>Last Name</Text>) : (<Text style={Styles.inputTextInvalid}>Invalid Last Name</Text>)}
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
                  {this.state.newMemberEmailInput ? (<Text style={Styles.inputText}>Email</Text>) : (<Text style={Styles.inputTextInvalid}>Invalid Email</Text>)}
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
          {/* ========================================================== */}

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
            customMapStyle={mapTheme}
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
              onPress={this.toggleOpen}
            >
              <Image // Render Nav icon based on side drawer open state
                source={
                  this.state.drawerOpen
                    ? require("../../assets/closeNav.png")
                    : require("../../assets/openNav.png")
                }
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
                  marginTop: "5%"
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
            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                bottom: -9,
                width: Dimensions.get("window").width,
                left: "5%"
              }}
            >
              <View style={sliderStyle.sliderDummy}>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#FFFFFF",
                    marginLeft: "auto",
                    marginRight: "auto",
                    top: "30%"
                  }}
                >
                  Slide for Emergency
                </Text>
              </View>
              <View style={sliderStyle.sliderReal}></View>
            </View>
            <Slider
              style={Styles.switch}
              step={1}
              thumbTintColor="#DC2237"
              minimumTrackTintColor="#DC2237"
              minimumValue={0}
              maximumValue={50}
              value={this.state.slideValue}
              onValueChange={this.Emergency}
              onSlidingComplete={this.slideReset}
              maximumTrackTintColor="transparent"
              minimumTrackTintColor="transparent"
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
        {/* This calls the method to render the layout based on group state */}
        <this.updateLandingPageMap />
      </View>
    );
  }
}

const mapTheme = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8ec3b9"
      }
    ]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1a3646"
      }
    ]
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#64779e"
      }
    ]
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878"
      }
    ]
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#334e87"
      }
    ]
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#023e58"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#283d6a"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6f9ba5"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#023e58"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3C7680"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#304a7d"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#2c6675"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#255763"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#b0d5ce"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#023e58"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#283d6a"
      }
    ]
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#3a4762"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#0e1626"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#4e6d70"
      }
    ]
  }
];

export default MapLanding;
