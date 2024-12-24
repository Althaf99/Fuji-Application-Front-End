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

  section: {
    paddingTop: "20px",
    flex: 1,
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {},
  },
  textField: {
    flex: 1,
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
  menuIconRoot: {
    width: "16px",
    height: "16px",
    color: "#808CA3",
    marginRight: "15px",
  },
    listTable: {
    paddingTop: "40px",
  },
  itemSaveBtn: {
    width: "100%",
    height: "40px",
    marginBottom: "50px",
  },
}));
