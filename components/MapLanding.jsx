import React, { Component } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";

class MapLanding extends Component {
    render() {
        return (
            <View style={pageStyles.mapContainer}>
                <MapView style={pageStyles.mapStyle} />
                <Text style={pageStyles.textContainer}>Here is the Map, how does it render for yall?</Text>
            </View>
        );
    }
}

const pageStyles = StyleSheet.create({
    mapContainer: {

    },
    mapStyle: {
        width: Dimensions.get("window").width,
        height: "90%"
    },
    textContainer: {
        width: Dimensions.get("window").width,
        height: "10%",
        backgroundColor: "#121212",
        color: "#ffffff"
    }
})

export default MapLanding;