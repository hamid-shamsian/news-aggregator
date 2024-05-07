import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SelectBox from "../components/common/SelectBox";
import LoadingSpinner from "../components/common/LoadingSpinner";
import NewsCard from "../components/widget/NewsCard";
import useNews from "../hooks/useNews";
import { ISource } from "../@types";
import config from "../../config.json";

const { SOURCES } = config;

const FeedPage = () => {
  const [source, setSource] = useState<ISource>(SOURCES[0] as ISource);

  const { data: newsArr, isFetching } = useNews(source, ["q=gold"]);

  const handleSourceChange = (value: string) => setSource(SOURCES[+value] as ISource);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      <Typography variant='h3' component='h1'>
        News Feed
      </Typography>

      <SelectBox
        label='Source'
        options={SOURCES.map(({ name, isDefault }, i) => ({ label: name, value: String(i), isDefault }))}
        onValueChange={handleSourceChange}
      />

      <Box component='ul' sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center", p: 0 }}>
        {newsArr?.map((news, i) => (
          <NewsCard key={i} news={news} />
        ))}
      </Box>

      {isFetching && <LoadingSpinner />}
    </Box>
  );
};

export default FeedPage;
