import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import Styles from "./../../css/styles";
import Separator from "../Separator";
import { Actions } from "react-native-router-flux";

class Information extends Component {
  //Routing
  //=========================================================
  goToSignUp = () => {
    Actions.SignUp();
  };
  //=========================================================
  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.header}>Information</Text>
        <Text style={Styles.paragraph}>
          How Sentinel Uses Information from our Users
        </Text>

        <Separator />
        <Separator />
        <Separator />

        <View style={Styles.innerContainer}>
          <Text style={Styles.smParagraph}>
            Sentinel uses the information shared by our users to deliver our
            services, maintain and improve them, develop new enhancements and
            features, and safeguard against fraud and abuse.
          </Text>

          <Separator />

          <Text style={Styles.smParagraph}>
            We strongly believe in protecting our family which is why we decided
            to develop this product, and we believe that there is no one better
            to protect our family from harm than ourselves. By signing up to our
            service, you will become part of the Sentinel family, which means
            your personal information is our number one priority.
          </Text>

          <Separator />

          <Text style={Styles.smParagraph}>
            We at Sentinel pride ourselves in not selling any personal data
            without asking our users for their permission.
          </Text>

          <Separator />

          <Text style={Styles.smParagraph}>
            Welcome to the Sentinel Family.
          </Text>
        </View>

        <Separator />
        <Separator />
        <Separator />
        <Separator />
        <Separator />

        <View style={Styles.smContainerView}>
          <TouchableOpacity style={Styles.smButton} onPress={this.goToSignUp}>
            <Text
              style={{
                fontSize: 13,

                left: "51%",
                width: "22%",
                color: "#1BCBC0"
              }}
            >
              Yes, I'm Ready
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 13,

              left: "23%",
              width: "27%",
              top: "-50%",
              color: "#8D8C8C"
            }}
          >
            Ready to sign up?
          </Text>
        </View>
      </View>
    );
  }
}

export default Information;
