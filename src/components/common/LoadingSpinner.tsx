import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

interface LoadingSpinnerProps {
  fullPage?: boolean;
  message?: string;
  layout?: "vertical" | "horizontal";
}

const LoadingSpinner = ({ fullPage, message, layout = "horizontal" }: LoadingSpinnerProps) => (
  <Box
    sx={{
      padding: 5,
      display: "flex",
      flexDirection: layout === "horizontal" ? "row" : "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 5,
      ...(fullPage && { position: "fixed", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "#fff6" })
    }}
  >
    <CircularProgress size={fullPage ? 80 : 30} />
    {message && <Typography>{message}</Typography>}
  </Box>
);

export default LoadingSpinner;
