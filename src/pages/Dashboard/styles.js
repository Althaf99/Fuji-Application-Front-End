import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme) => ({
  gridContainer: {
    flexDirection: "column",
    flexWrap: "nowrap",
    backgroundColor: "#FFFFFF",
    padding: "30px",
    display: "flex",
    justifyContent: "center",
    minHeight: "100vh",
  },
  templateTitle: {
    fontSize: "1rem", // reduced from default
  },
  itemChart: {
    padding: "15px",
    fontSize: "0.9rem", // reduced from default
  },
}));
