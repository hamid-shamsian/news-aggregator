import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingSpinner = () => (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#fff6",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <CircularProgress size={80} />
  </Box>
);

export default LoadingSpinner;
