import { Dimensions } from "react-native";

const Styles = {
  // button: {
  //   borderRadius: 50,
  //   backgroundColor: "#1F4CC6",
  //   height: 50
  // },

  buttonText: {
    fontSize: 17,
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 15,
    marginBottom: 14,
    color: "white"
  },

  container: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 75,
    flex: 1,
    backgroundColor: "#121212",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },

  family: {
    width: Dimensions.get("window").width,
    height: "30%",
    flex: 0.4,
    backgroundColor: "white"
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0
  },

  header: {
    marginTop: 50,
    fontSize: 40,
    textAlign: "left",
    color: "#1BCBC0",
    paddingBottom: 5
  },

  innerContainer: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "rgb(53,53,53)"
  },

  mapContainer: {
    backgroundColor: "#121212",
    width: "100%",
    height: "100%"
  },

  mapStyle: {
    width: Dimensions.get("window").width,
    height: "60%",
    marginTop: 30
  },

  // Nav: {
  //   marginRight: "80%",
  //   backgroundColor: "#000000"
  // },

  mapUI: {
    paddingTop: "2.5%",
    paddingLeft: "2.5%",
    paddingRight: "2.5%",
    paddingBottom: "2.5%",

    color: "#ffffff",
    fontSize: 17
  },

  paragraph: {
    fontSize: 17,
    justifyContent: "center",
    textAlign: "left",
    marginBottom: 14,
    color: "white"
  },

  textContainer: {
    width: Dimensions.get("window").width,
    height: "25%",
    backgroundColor: "#121212"
  },

  separator: {
    marginVertical: 6
  },

  smButton: {
    backgroundColor: "#121212",
    color: "rgb(90,89,89)"
  },

  smButtonText: {
    fontSize: 13,
    color: "#1BCBC0",
    textAlign: "center"
  },

  smParagraph: {
    fontSize: 15,
    color: "white"
  },

  switch: {
    width: Dimensions.get("window").width,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 20,
    borderRadius: 50,
    height: "20%"
    // backgroundColor: "rgb(31,76,198)"
  }
};
export default Styles;
