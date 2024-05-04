import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import apiClient from "../services/apiClient";
import NewsCard from "../components/widget/NewsCard";
import { INews } from "../@types/News";

const FeedPage = () => {
  const [newsArr, setNewsArr] = useState<INews[]>([]);

  useEffect(() => {
    (async () => {
      const res = await apiClient.get("/everything?q=bitcoin&apiKey=608e0565cf8a4984b7111ae82dcca97d");
      setNewsArr(res.data.articles);
    })();
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      <Typography variant='h3' component='h1'>
        News Feed
      </Typography>

      <Box component='ul' sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center", p: 0 }}>
        {newsArr.map((news, i) => (
          <NewsCard key={i} news={news} />
        ))}
      </Box>
    </Box>
  );
};

export default FeedPage;
