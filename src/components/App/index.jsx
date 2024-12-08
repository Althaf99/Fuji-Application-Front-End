import { AppRouter } from "../AppRouter";
import { RouterProvider } from "react-router-dom";
import ThemeDefault from "../../themes/default";
import "react-datepicker/dist/react-datepicker.css";
import { ThemeProvider, CssBaseline, Grid } from "@material-ui/core";
import { UserProvider } from "../UserContext";

const App = () => {
  const router = AppRouter();
  return (
    <UserProvider>
      <ThemeProvider theme={ThemeDefault}>
        <CssBaseline />
        <RouterProvider router={router.router} />
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
