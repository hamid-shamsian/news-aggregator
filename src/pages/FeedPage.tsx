import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NewsExplorer from "../components/widget/NewsExplorer";
import config from "../../config.json";

const { SOURCES } = config;

const FeedPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      <Typography variant='h3' component='h1'>
        News Feed
      </Typography>

      <NewsExplorer sources={SOURCES} />
    </Box>
  );
};

export default FeedPage;
