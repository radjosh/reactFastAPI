import React from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App";
import "./reset.css";
import "./styles.css";

import { createTheme, ThemeProvider } from "@mui/material/styles"
import { yellow } from "@mui/material/colors"

const root = createRoot(document.querySelector("#root"));
const theme = createTheme({
  palette: {
    primary: { 
      main: yellow[100],
    },    
    secondary: {
      main: yellow[300],
    },    
  },    
});   

root.render(
<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>

);
