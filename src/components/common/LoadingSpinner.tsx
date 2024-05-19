import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

interface LoadingSpinnerProps {
  fullPage?: boolean;
  message?: string;
  layout?: "vertical" | "horizontal";
  onCancel?: () => void;
}

const LoadingSpinner = ({ fullPage, message, layout = "horizontal", onCancel }: LoadingSpinnerProps) => (
  <Box
    sx={{
      padding: 5,
      display: "flex",
      flexDirection: layout === "horizontal" ? "row" : "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 5,
      ...(fullPage && { position: "fixed", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "secondary.main" })
    }}
  >
    <CircularProgress size={fullPage ? 80 : 30} />
    {message && <Typography>{message}</Typography>}
    {onCancel && (
      <Button variant='contained' onClick={onCancel}>
        Cancel
      </Button>
    )}
  </Box>
);

export default LoadingSpinner;
