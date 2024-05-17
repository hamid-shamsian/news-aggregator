import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SelectBox from "../components/common/SelectBox";
import LoadingSpinner from "../components/common/LoadingSpinner";
import DynamicCategoriesBox from "../components/widget/DynamicCategoriesBox";
import DateFilterBox from "../components/widget/DateFilterBox";
import InfiniteList from "../components/widget/InfiniteList";
import NewsCard from "../components/widget/NewsCard";
import { useInfiniteData } from "../hooks/useData";
import { DataType, INews, ISource } from "../@types";
import config from "../../config.json";

const { SOURCES }: { SOURCES: ISource[] } = config;
const sourceOptions = SOURCES.map(({ name, isDefault }, i) => ({ label: name, value: String(i), isDefault }));

const FeedPage = () => {
  const [source, setSource] = useState<ISource>();
  const [category, setCategory] = useState("");
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });

  const queries = getQueries(source, category, dateFilter);
  const { data: news, isFetching, hasNextPage, fetchNextPage } = useInfiniteData<INews>(DataType.news, source, 6, queries);

  const handleSourceChange = (value: string) => {
    setSource(SOURCES[+value]);
    setCategory("");
    setDateFilter({ from: "", to: "" });
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleDateFilter = (values: { from: string; to: string }) => {
    setDateFilter(values);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      <Typography variant='h3' component='h1'>
        News Feed
      </Typography>

      <Box sx={{ alignSelf: "stretch", display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
        <SelectBox label='Source' options={sourceOptions} onValueChange={handleSourceChange} />

        {source?.staticCategories && <SelectBox label='Category' options={source.staticCategories} onValueChange={handleCategoryChange} />}
        {source?.categories && <DynamicCategoriesBox source={source} onCategoryChange={handleCategoryChange} />}
      </Box>

      {source?.filteringByDate && <DateFilterBox onChangeValues={handleDateFilter} />}

      <InfiniteList<INews> data={news?.pages ?? []} hasMore={hasNextPage} nextFn={fetchNextPage}>
        {({ item }) => <NewsCard news={item} />}
      </InfiniteList>

      {isFetching && !news && <LoadingSpinner fullPage={true} />}
    </Box>
  );
};

const getQueries = (source: ISource | undefined, category: string, { from, to }: { from: string; to: string }) => {
  let queries = "";
  if (category) queries += `&${source?.news.categoryQueryParam}=${category}`;
  if (from) queries += `&${source?.filteringByDate?.fromQueryParam}=${from}`;
  if (to) queries += `&${source?.filteringByDate?.toQueryParam}=${to}`;
  return queries;
};

export default FeedPage;
