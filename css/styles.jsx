import { Dimensions } from "react-native";

const Styles = {
  button: {
    borderRadius: 50,
    backgroundColor: "rgb(31,76,198)"
  },

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

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0
  },

  header: {
    marginTop: 0,
    fontSize: 30,
    textAlign: "left",
    color: "rgb(0,234,233)",
    paddingBottom: 5
  },

  innerContainer: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "rgb(53,53,53)"
  },

  mapStyle: {
    width: Dimensions.get("window").width,
    height: "75%"
  },

  mapUI: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,

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
    color: "white",
    textAlign: "center"
  },

  smParagraph: {
    fontSize: 15,
    color: "white"
  }
};
export default Styles;
