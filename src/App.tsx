import { RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import router from "./routes";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
