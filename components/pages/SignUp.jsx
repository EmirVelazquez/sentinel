import React from "react";
import { View, Text, TextInput, Image, AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
import Styles from "../../css/styles";
import Separator from "../Separator";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import Button from "apsl-react-native-button";
import axios from 'axios';
import ValidationComponent from 'react-native-form-validator';

class SignUp extends ValidationComponent {

  constructor(props) {
    super(props);
    // Retrieving input data
    this.state = {
      signUpFName: "",
      signUpLName: "",
      signUpEmail: "",
      signUpPassword: "",
      hidePassword: true,
      // For form validation
      signUpFNameInput: true,
      signUpLNameInput: true,
      signUpEmailInput: true,
      signUpPasswordInput: true
    }
  }

  // Store JWT
  storeToken = async (token) => {
    try {
      console.log('Storing jwt');
      await AsyncStorage.setItem('jwt', token);
      // Render map
      Actions.MapLanding();
    } catch (error) {
      console.log(error);
    }
  }

  signUp() {
    axios.post('https://sentinel-api.herokuapp.com/api/user',
      {
        first_name: this.state.signUpFName,
        last_name: this.state.signUpLName,
        email: this.state.signUpEmail,
        pass: this.state.signUpPassword
      })
      .then(response => {
        if (response.status === 200) {
          const email = this.state.signUpEmail;
          const pass = this.state.signUpPassword;
          // Send log in info, receive token
          axios.post('https://sentinel-api.herokuapp.com/login/submit',
            {
              email,
              pass
            })
            .then(res => {
              const token = res.data.token;
              if (token) {
                this.storeToken(token);
              }
            });
        }
      });
  }

  goToInformation = () => {
    Actions.Information();
  };

  //store the email in async storage //
  //=========================================================

  storeEmail = async () => {
    console.log('Storing email');
    try {
      await AsyncStorage.setItem('email', this.state.signUpEmail);
    } catch (error) {
      console.log(error);
    }
  }

  //Individual onChange handlers for each part of state
  //=========================================================
  handleSignUpFNameChange = event => {
    console.log("First Name Change: " + event);
    this.setState({
      signUpFName: event.toLowerCase()
    });
  };

  handleSignUpLNameChange = event => {
    console.log("Last Name Change: " + event);
    this.setState({
      signUpLName: event.toLowerCase()
    });
  };

  handleSignupEmailChange = event => {
    console.log("Email Change: " + event);
    this.setState({
      signUpEmail: event.toLowerCase()
    });
  };

  handleSignUpPasswordChange = event => {
    console.log("Password Change: " + event);
    this.setState({
      signUpPassword: event.toLowerCase()
    });
  };
  //=========================================================

  // Form submit
  handleFormSubmit = _ => {
    console.log(this.state);
    // Logic for Authentication of characters
    //=========================================================
    // validate isn't working for blank fields on this page for some reason
    // it worked fine on home.jsx, this is the workaround:
    if (this.state.signUpFName === undefined || this.state.signUpLName === undefined || this.state.signUpEmail === undefined || this.state.signUpPassword === undefined) {
      if (this.state.signUpFName === undefined) {
        this.setState({ signUpFNameInput: false });
      }
      if (this.state.signUpLName === undefined) {
        this.setState({ signUpLNameInput: false });
      }
      if (this.state.signUpEmail === undefined) {
        this.setState({ signUpEmailInput: false });
      }
      if (this.state.signUpPassword === undefined) {
        this.setState({ signUpPasswordInput: false });
      }
    }
    else {
      // Validating the form entries
      this.validate({
        signUpFName: { minlength: 2, maxlength: 16, required: true },
        signUpLName: { minlength: 2, maxlength: 16, required: true },
        signUpEmail: { email: true, required: true },
        signUpPassword: { minlength: 3, maxlength: 24, required: true },
      });
      // Form entries are all valid
      if (this.isFormValid()) {
        // Add info to db, get token and store in asyncstorage
        this.signUp();
        // Stores email in asyncstorage
        this.storeEmail();
      }
      // Form validation response
      else {
        const fieldArray = ['signUpFName', 'signUpLName', 'signUpEmail', 'signUpPassword'];
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
  };

  managePasswordVisability = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };

  render() {
    return (
      <ScrollView>
        <View style={Styles.container}>
          <Text style={Styles.header}>Welcome!</Text>
          <Text style={Styles.paragraph}>
            Please help us with some details to create your account
          </Text>

          <Separator />
          <Separator />
          <Separator />
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
            {this.state.signUpFNameInput ? (<Text style={Styles.inputText}>First Name</Text>) : (<Text style={Styles.inputTextInvalid}>Invalid First Name</Text>)}
            <TextInput
              style={{
                marginLeft: 12,
                marginBottom: 16,
                fontSize: 18,
                // backgroundColor: "#000000", // Using this to test the height for the next two - Emir
                height: 30,
                color: "white"
              }}
              name="signUpFName"
              returnKeyType="next"
              onChangeText={this.handleSignUpFNameChange}
              signUpFName={this.state.signUpFName}
              onSubmitEditing={() => this.LNameInput.focus()}
            />
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
            {this.state.signUpLNameInput ? (<Text style={Styles.inputText}>Last Name</Text>) : (<Text style={Styles.inputTextInvalid}>Invalid Last Name</Text>)}
            <TextInput
              style={{
                marginLeft: 12,
                marginBottom: 16,
                fontSize: 18,
                // backgroundColor: "#000000", // Using this to test the height for the next two - Emir
                height: 30,
                color: "white"
              }}
              name="signUpLName"
              returnKeyType="next"
              onChangeText={this.handleSignUpLNameChange}
              signUpLName={this.state.signUpLName}
              onSubmitEditing={() => this.emailInput.focus()}
              ref={input => (this.LNameInput = input)}
            />
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
            {this.state.signUpEmailInput ? (<Text style={Styles.inputText}>Email</Text>) : (<Text style={Styles.inputTextInvalid}>Invalid Email</Text>)}
            <TextInput
              style={{
                marginLeft: 12,
                marginBottom: 16,
                fontSize: 18,
                // backgroundColor: "#000000", // Using this to test the height for the next two - Emir
                height: 30,
                color: "white"
              }}
              name="signUpEmail"
              autoCapitalize="none"
              returnKeyType="next"
              onChangeText={this.handleSignupEmailChange}
              signUpEmail={this.state.signUpEmail}
              keyboardType="email-address"
              onSubmitEditing={() => this.passwordInput.focus()}
              ref={input => (this.emailInput = input)}
            />
          </View>

          <View
            style={{
              height: 60,
              width: "115%",
              backgroundColor: "rgb(53,53,53)",
              color: "white",
              borderRadius: 5,
              alignSelf: "center",
              marginBottom: 22
            }}
          >
            {this.state.signUpPasswordInput ? (<Text style={Styles.inputText}>Password</Text>) : (<Text style={Styles.inputTextInvalid}>Invalid Password</Text>)}
            <TextInput
              style={{
                marginLeft: 12,
                marginBottom: 16,
                fontSize: 18,
                height: 30,
                color: "white"
              }}
              name="SignUpPassword"
              returnKeyType="go"
              onChangeText={this.handleSignUpPasswordChange}
              signUpPassword={this.state.signUpPassword}
              secureTextEntry={this.state.hidePassword}
              ref={input => (this.passwordInput = input)}
            />
          </View>
          <View style={{ width: "115%", alignSelf: "center" }}>
            <Text
              style={{
                color: "#8D8C8C",
                marginBottom: 11,
                marginLeft: 12,
                fontSize: 12
              }}
            >
              Account Completion:
            </Text>
            <Image
              source={require("./../../assets/completeZero.png")}
              style={{
                width: "100%",
                borderRadius: 50,
                height: 8,
                marginBottom: 31
              }}
            ></Image>
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

          <View style={Styles.smContainerView}>
            <TouchableOpacity
              style={{
                backgroundColor: "#121212",
                fontSize: 13,
                color: "rgb(90,89,89)",
                width: "17%",
                left: "65%"
              }}
              onPress={this.goToInformation}
            >
              <Text style={{ fontSize: 13, color: "#1BCBC0", bottom: 0.5 }}>
                Learn More
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 13,
                left: "15%",
                top: "-50%",
                color: "#8D8C8C",
                width: "49%"
              }}
            >
              How will we use your information?
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default SignUp;
