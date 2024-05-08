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
const sourceOptions = SOURCES.map(({ name, isDefault }, i) => ({ label: name, value: String(i), isDefault }));

const FeedPage = () => {
  const [source, setSource] = useState<ISource>();
  const [category, setCategory] = useState<string>("");

  let queries = "";
  if (category) queries += "&" + `${source?.news.categoryQueryParam}=${category}`;

  const { data: newsArr, isFetching } = useNews(source, queries);

  const handleSourceChange = (value: string) => {
    setSource(SOURCES[+value]);
    setCategory("");
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      <Typography variant='h3' component='h1'>
        News Feed
      </Typography>

      <Box sx={{ alignSelf: "stretch", display: "flex", gap: 5, flexWrap: "wrap" }}>
        <SelectBox label='Source' options={sourceOptions} onValueChange={handleSourceChange} />
        {source?.staticCategories ? <SelectBox label='Category' options={source.staticCategories} onValueChange={handleCategoryChange} /> : null}
      </Box>

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
