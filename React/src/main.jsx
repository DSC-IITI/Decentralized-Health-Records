import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";

const themeX = createTheme({
  palette: {
    mode: "dark",
    grey: {
      800: "#000000", // Correct format for defining custom shade
      900: "#121212", // Correct format for defining custom shade
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MoralisProvider>
      <NotificationProvider>
    <ThemeProvider theme={themeX}>
      <App />
    </ThemeProvider>
    </NotificationProvider>
    </MoralisProvider>
  </React.StrictMode>
);
