import { Dimensions } from "react-native";

const Styles = {
  container: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 15,
    flex: 1,
    backgroundColor: "#121212",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },

  innerContainer: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "rgb(53,53,53)"
  },

  header: {
    marginTop: 0,
    fontSize: 30,
    textAlign: "left",
    color: "rgb(0,234,233)",
    paddingBottom: 5
  },

  separator: {
    marginVertical: 6
  },

  paragraph: {
    fontSize: 17,
    justifyContent: "center",
    textAlign: "left",
    marginBottom: 14,
    color: "white"
  },

  smParagraph: {
    fontSize: 15,
    color: "white"
  },

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

  smButton: {
    backgroundColor: "rgb(13,13,13)",
    color: "rgb(90,89,89)"
  },

  smButtonText: {
    fontSize: 13,
    color: "white",
    textAlign: "center"
  },

  kbav: {
    flex: 1
  }
};
export default Styles;
