import { Dimensions } from "react-native";

const Styles = {
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
    paddingTop: 10,
    flex: 1,
    backgroundColor: "#121212",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },

  family: {
    width: Dimensions.get("window").width,
    alignSelf: "center",
    paddingLeft: "2.5%",
    paddingRight: "2.5%"
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0
  },

  header: {
    marginTop: 30,
    marginLeft: -10,
    fontSize: 40,
    textAlign: "left",
    color: "#1BCBC0",
    paddingBottom: 5
  },

  headerCentered: {
    marginTop: 30,
    marginLeft: -10,
    fontSize: 40,
    textAlign: "left",
    color: "#1BCBC0",
    paddingBottom: 5,
    marginLeft: "auto",
    marginRight: "auto"
  },

  innerContainer: {
    padding: "3.25%",
    borderRadius: 5,
    marginLeft: -20,
    width: "112%",
    backgroundColor: "rgb(53,53,53)"
  },

  inputText: {
    marginLeft: 12,
    fontSize: 12,
    marginTop: 9,
    color: "#8D8C8C",
    width: "50%" // This change may also help to not cover the Forgot button on the home page - Emir
  },

  mapContainer: {
    backgroundColor: "#121212",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },

  userHasGroup: {
    width: Dimensions.get("window").width,
    height: "60%",
    zIndex: 1,
    marginTop: 20
  },

  userHasNoGroup: {
    width: Dimensions.get("window").width,
    height: "85%",
    marginTop: 20
  },

  mapUI: {
    paddingTop: "2.5%",
    paddingLeft: "2.5%",
    paddingRight: "2.5%",
    paddingBottom: "5%",
    color: "#ffffff",
    fontSize: 17
    // backgroundColor: "grey"
  },

  noUsers: {
    width: Dimensions.get("window").width,
    color: "white",
    textAlign: "center"
  },

  noUserContainer: {
    width: Dimensions.get("window").width,
    backgroundColor: "red"
  },

  paragraph: {
    fontSize: 17,
    marginLeft: -10,
    justifyContent: "center",
    textAlign: "left",
    marginBottom: 14,
    color: "white"
  },

  paragraphCentered: {
    fontSize: 17,
    marginLeft: -10,
    justifyContent: "center",
    textAlign: "left",
    marginBottom: 14,
    color: "white",
    marginLeft: "auto",
    marginRight: "auto"
  },

  textContainer: {
    width: Dimensions.get("window").width,
    height: "25%",
    backgroundColor: "#121212"
  },

  separator: {
    marginVertical: 6
  },

  smContainerView: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    alignSelf: "center",
    justifyContent: "center"
  },

  smParagraph: {
    fontSize: 15,
    color: "white"
  },

  switch: {
    width: "90%",
    position: "absolute",
    left: "7%",
    right: 0,
    top: Dimensions.get("window").height - 550,
    borderRadius: 50,
    height: "20%",
  },
  users: {
    width: 60,
    height: 60,
    marginRight: 22
  },
  userText: {
    textAlign: "center",
    color: "#8D8C8C",
    marginTop: 10
  }
};
export default Styles;
