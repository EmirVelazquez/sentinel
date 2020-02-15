import { Dimensions } from "react-native";
const Styles = {
  container: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 50,
    backgroundColor: "black",
    height: Dimensions.get("window").height - 80
  },
  header: {
    margin: 24,
    marginTop: 0,
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  },
  separator: {
    marginVertical: 8
    // borderBottomColor: "#737373",
    // borderBottomWidth: StyleSheet.hairlineWidth
  }
};
export default Styles;
