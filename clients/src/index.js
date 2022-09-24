import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./features/store";
import { unstable_createMuiStrictModeTheme as createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { GoogleOAuthProvider } from "@react-oauth/google";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: ["Poppins"].join(","),
    palette: {
      primary: "#FFFFFF",
      secondary: "4A4D4E",
    },
  },
  palette: {
    primary: {
      main: "#00b8d4",
    },
    secondary: {
      main: "#fff",
    },
    tertiary: {
      main: "#000",
    },
  },
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
