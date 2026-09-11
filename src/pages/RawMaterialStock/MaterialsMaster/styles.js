import { makeStyles } from "@mui/styles";

export const styles = makeStyles((theme) => ({
  gridContainer: {
    flexDirection: "column",
    flexWrap: "nowrap",
    backgroundColor: "#FFFFFF",
    padding: "30px",
    minHeight: "100vh",
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
  topCards: {
    paddingTop: "10px",
  },
}));
