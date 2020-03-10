import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import Styles from "./../../css/styles";
import axios from 'axios';
import ValidationComponent from 'react-native-form-validator';

// TODO's
// Add update account information option
// Add delete user account option

class Settings extends ValidationComponent {

    constructor(props) {
        super(props);
        // Retrieving input data
        this.state = {
            signUpFName: "",
            signUpLName: "",
            signUpEmail: "",
            signUpPassword: "",
            // For form validation
            signUpFNameInput: true,
            signUpLNameInput: true,
            signUpEmailInput: true,
            signUpPasswordInput: true
        }
    }

    update() {
        // Need to create route on backend and update url
        axios.put('https://sentinel-api.herokuapp.com/api/',
            {
                first_name: this.state.signUpFName,
                last_name: this.state.signUpLName,
                email: this.state.signUpEmail,
                pass: this.state.signUpPassword
            })
            .then(response => {
                if (response.status === 200) {
                    Actions.Home();
                }
                else {
                    // Need to notify user of error and stay on page
                }
            })
    }

    delete() {
        // Need to create route on backend and update url
        axios.delete('https://sentinel-api.herokuapp.com/api/',
            {}
        )
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




}

export default Settings;