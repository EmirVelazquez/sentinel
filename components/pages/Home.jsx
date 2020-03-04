import React from "react";
import { Text, View, TextInput, AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Button from "apsl-react-native-button";
import axios from 'axios';
import JWT from 'expo-jwt';
import ValidationComponent from 'react-native-form-validator';

import Logo from "../Logo";

import Styles from "../../css/styles";
import Separator from "../Separator";
import LogoSecond from "../LogoSecond";

class Home extends ValidationComponent {
  //Initializing state to capture input
  state = {
    email: "",
    password: "",
    hidePassword: true,
    loggedIn: false,
    // For form validation
    count: 0,
    emailInput: true,
    passwordInput: true

  };

  // AsyncStorage function to store current user infomation
  //========================================================
  // Store JWT token in async storage and render map
  storeToken = async (token) => {
    try {
      await AsyncStorage.multiSet([['jwt', token], ['email', this.state.email]]);
      // Render map
      Actions.MapLanding();
    } catch (error) {
      console.log(error);
    }
  }

  // Pull token from asyncstorage and decode - gets id and email
  getToken = _ => {
    AsyncStorage.getItem('jwt', (err, token) => {
      if (!err && token != null) {
        const key = 'secretkey';
        if (JWT.decode(token, key)) {
          this.setState({
            loggedIn: true
          });
          if (this.state.loggedIn) {
            Actions.MapLanding();
          }
        }
      }
      else {
        console.log("No token found");
      }
    });
  }

  // Log in function
  logIn() {
    const { email, password } = this.state;
    axios.post('https://sentinel-api.herokuapp.com/login/submit',
      {
        email,
        pass: password
      })
      .then(response => {
        const token = response.data.token;
        // Email / password combination found - create jwt and render map
        if (token) {
          this.storeToken(token);
        }
        // Email doesn't exist or password is incorrect
        else {
          // need to inform user 
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  //========================================================

  //Individual onChange handlers for each part of state
  //=========================================================
  handleEmailChange = event => {
    console.log("Email Change: " + event);
    this.setState({
      email: event.toLowerCase()
    });
  };

  handlePasswordChange = event => {
    console.log("Password Change: " + event);
    this.setState({
      password: event.toLowerCase()
    });
  };
  //=========================================================

  //Password Visability Functions
  //=========================================================
  managePasswordVisability = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };
  //=========================================================

  // Form submit
  handleFormSubmit = _ => {
    // State count used for logo conditional rendering
    this.setState({ count: this.state.count + 1 });
    // Validating the form entries
    this.validate({
      email: { email: true, required: true },
      password: { minlength: 3, maxlength: 24, required: true }
    });
    // Form entries are all valid
    if (this.isFormValid()) {
      // Get token and send to map
      this.logIn();
    }
    // Form validation response
    else {
      const fieldArray = ['email', 'password'];
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
  };
  //=========================================================
  //Forgot email route:
  goToForgotEmail = () => {
    console.log("Forgot Password! Sending user to forgotPassword component");
    Actions.ForgotEmail();
  };

  //=========================================================

  //Routing
  //=========================================================
  goToSignUp = () => {
    console.log('go to sign up');
    Actions.SignUp();
  };
  //=========================================================

  componentDidMount = _ => {
    this.getToken();
  }

  render() {
    return (
      <ScrollView>
        <View style={Styles.container}>

          {this.state.count ? (<LogoSecond />) : (<Logo />)}


          <Text style={Styles.header}>Sentinel</Text>
          <Text style={Styles.paragraph}>Please sign in to continue</Text>

          <Separator />
          <Separator />

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

            {this.state.emailInput ? (<Text style={Styles.inputText}>Email</Text>) : (<Text style={Styles.inputTextInvalid}>Email Incorrect</Text>)}
            <TextInput
              name="email"
              style={{
                marginLeft: 12,
                marginBottom: 16,
                fontSize: 18,
                color: "white",
                // backgroundColor: "#000000", // Using this to test the height for the next two - Emir
                height: 30,
                width: "94%"
              }}
              onChangeText={this.handleEmailChange}
              email={this.state.email}
              keyboardType="email-address"
              onSubmitEditing={() => this.passwordInput.focus()}
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
              marginBottom: 32,
              position: "relative"
            }}
          >

            {this.state.passwordInput ? (<Text style={Styles.inputText}>Password</Text>) : (<Text style={Styles.inputTextInvalid}>Password Incorrect</Text>)}
            <TouchableOpacity
              onPress={this.goToForgotEmail}
              style={{
                color: "#1BCBC0",
                // top: -5, // This small change allowed it to not be cut off on the iphone screen - Emir
                left: "80%",
                width: "15%",
                fontSize: 14,
                paddingBottom: 10
              }}
            >
              <Text style={{ color: "#1BCBC0" }}>FORGOT</Text>
            </TouchableOpacity>
            <TextInput
              name="password"
              style={{
                marginLeft: 12,
                marginBottom: 16,
                fontSize: 18,
                top: -25,
                width: "75%",
                color: "white",
                // backgroundColor: "#000000", // Using this to test the height of the input - Emir
                height: 30
              }}
              onChangeText={this.handlePasswordChange}
              password={this.state.password}
              secureTextEntry={this.state.hidePassword}
              ref={input => (this.passwordInput = input)}
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
            <Text style={Styles.buttonText}>Login</Text>
          </Button>
          <View style={Styles.smContainerView}>
            <TouchableOpacity
              style={{
                backgroundColor: "#121212",
                color: "rgb(90,89,89)",
                width: "10%",
                left: "62%",
                paddingTop: 10,
                paddingRight: 60
              }}
              onPress={this.goToSignUp}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: "#1BCBC0",
                  textAlign: "center",
                  width: 50,
                  bottom: 1
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 13,
                left: "27%",
                top: "-41%",
                color: "#8D8C8C",
                width: "33%"
              }}
            >
              Don't have an account?
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Home;
