import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme) => ({
  gridContainer: {
    flexDirection: "column",
    flexWrap: "nowrap",
    backgroundColor: "#FFFFFF",
    padding: "30px",
    paddingTop: "10px",
  },
  plusIcon: {
    width: "30px",
    height: "30px",
    color: "White",
    paddingRight: "2px",
  },

  section: {
    paddingTop: "10px",
    height: "100%",
    paddingBottom: "30px",
  },
  label: {
    color: "rgba(0, 24, 71, 1)",
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "0.875rem",
    paddingBottom: "4px",
  },
  printButton: {
    paddingTop: "10px",
  },
  menuIconRoot: {
    width: "20px",
    height: "20px",
    color: "#808CA3",
    marginRight: "0px",
  },
}));
