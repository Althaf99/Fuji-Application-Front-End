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
  itemChart: {
    padding: "15px",
  },
}));
