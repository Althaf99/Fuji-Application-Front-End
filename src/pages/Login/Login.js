import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  body: {
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    // backgroundRepeat: "repeat",
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "40%",
    marginLeft: "30%",
    // marginTop: "250px",
  },
  container: {
    width: "35rem",
    height: "max-content",
    boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
    borderRadius: "5px",
    position: "relative",
    zIndex: 1,
    background: "inherit",
    overflow: "hidden",
    padding: "50px",
    "&:before": {
      content: '""',
      position: "absolute",
      background: "inherit",
      zIndex: -1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      boxShadow: "inset 0 0 2000px rgba(255, 255, 255, .5)",
      filter: "blur(100px)",
      margin: "-20px",
    },
  },
  image: {
    maxWidth: "90%",
    maxHeight: "90%",
    display: "flex",
    zIndex: "99",
    position: "relative",
  },
}));

export default useStyles;
