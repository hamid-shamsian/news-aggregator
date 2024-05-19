import { createTheme } from "@mui/material/styles";

const light = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976D2" // "#556cd6"
    },
    secondary: {
      main: "#fff6" // "#19857b"
    }
  }
});

const dark = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#303F9F" // "#556cd6"
    },
    secondary: {
      main: "#0006" // "#19857b"
    }
  }
});

const themes: { [key: string]: object } = { light, dark };

export default themes;
