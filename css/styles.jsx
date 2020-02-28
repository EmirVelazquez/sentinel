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

  inputText: { marginLeft: 12, fontSize: 12, marginTop: 9, color: "#8D8C8C" },

  mapContainer: {
    backgroundColor: "#121212",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },

  mapStyle: {
    width: Dimensions.get("window").width,
    height: "60%",
    marginTop: 30
  },

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
