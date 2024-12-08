import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme) => ({
  container: {
    flexDirection: "row",
    flexWrap: "nowrap",
    padding: "0em 3.5625em",
    display: "flex",
    width: "100%",
    margin: "0",
    overflow: "hidden",
    justifyContent: "space-between",
    "@media (max-width: 1330px)": {
      padding: "0em",
    },
  },
  gridContainer: {
    backgroundColor: "#FFFFFF",
    padding: "30px",
    display: "flex",
    justifyContent: "center",
    minHeight: "100vh",
    paddingTop: "10px",
  },
  heading: {
    paddingTop: "29px",
  },
  section: {
    paddingTop: "10px",
    paddingRight: "20px",
    flex: 1,
  },
  buttonSection: {
    paddingTop: "40px",
    flex: 1,
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {},
  },
  textField: {
    flex: 1,
  },
  errorTextField: {
    borderColor: "red !important",
  },
  block: {
    display: "flex",
    flexDirection: "row-reverse",
    paddingTop: "40px",
  },
  button: {
    width: "166px",
    height: "40px",
    marginBottom: "50px",
  },
  itemNameButton: {
    width: "100%",
    height: "50px",
  },
  backButton: {
    width: "166px",
    height: "40px",
    marginBottom: "50px",
    marginRight: "20px",
  },
  invalid: {
    color: "red",
    fontSize: "0.75rem",
  },
  tags: {
    paddingTop: "10px",
  },
  required: {
    color: "red",
  },
  displayButton: {
    width: "100%",
    height: "50px",
    backgroundColor: "#ff9200",
  },
  listTable: {
    paddingTop: "40px",
  },
  label: {
    color: "rgba(0, 24, 71, 1)",
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "0.875rem",
    paddingBottom: "14px",
  },
  menuIconRoot: {
    width: "16px",
    height: "16px",
    color: "#808CA3",
    // marginRight: "15px",
  },
  deleteBtn: {
    "&:hover": {
      backgroundColor: "transparent !important",
    },
    textTransform: "none",
    color: "red",
    padding: 0,
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    minWidth: "50px",
    height: "26px",
  },
}));
