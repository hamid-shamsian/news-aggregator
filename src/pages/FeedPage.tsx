import { Box, CircularProgress, Typography } from "@mui/material";
import NewsCard from "../components/widget/NewsCard";
import useNews from "../hooks/useNews";
import { ISource } from "../@types";
import config from "../../config.json";

const { SOURCES } = config;

const FeedPage = () => {
  const { data: newsArr, isLoading } = useNews(SOURCES[1] as ISource, ["q=gold"]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      <Typography variant='h3' component='h1'>
        News Feed
      </Typography>

      <Box component='ul' sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center", p: 0 }}>
        {isLoading && <CircularProgress />}
        {newsArr?.map((news, i) => (
          <NewsCard key={i} news={news} />
        ))}
      </Box>
    </Box>
  );
};

export default FeedPage;
