import { Dimensions } from "react-native";
const Styles = {
  container: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 50,
    backgroundColor: "black",
    height: Dimensions.get("window").height - 80
  },
  innerContainer: {},
  header: {
    margin: 24,
    marginTop: 0,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    borderBottomWidth: 2,
    borderBottomColor: "grey",
    paddingBottom: 5
  },
  separator: {
    marginVertical: 8
  },
  paragraph: {
    fontSize: 17,
    justifyContent: "center",
    textAlign: "left",
    marginBottom: 14,
    color: "white"
  }
};
export default Styles;
