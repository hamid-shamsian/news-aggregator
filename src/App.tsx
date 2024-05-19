import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import router from "./routes";
import useThemeMode from "./hooks/useThemeMode";
import themes from "./styles/themes";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const App = () => {
  const themeMode = useThemeMode();

  return (
    <ThemeProvider theme={themes[themeMode] ?? themes.light}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
