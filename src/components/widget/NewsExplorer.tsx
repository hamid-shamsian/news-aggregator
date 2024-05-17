import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import DynamicCategoriesBox from "./DynamicCategoriesBox";
import DateFilterBox from "./DateFilterBox";
import InfiniteList from "./InfiniteList";
import NewsCard from "./NewsCard";
import SelectBox from "../common/SelectBox";
import LoadingSpinner from "../common/LoadingSpinner";
import { useInfiniteData } from "../../hooks/useData";
import { DataType, INews, ISource } from "../../@types";

interface NewsAggregatorProps {
  sources: ISource[]; // sources to be assigned from the parent component in order to be able to use this NewsExplorer with different lists of sources each time.
  searchQuery?: string;
}

const NewsExplorer = ({ sources, searchQuery }: NewsAggregatorProps) => {
  const sourceOptions = useMemo(() => sources.map(({ name, isDefault }, i) => ({ label: name, value: String(i), isDefault })), [sources]);

  const [source, setSource] = useState<ISource>();
  const [category, setCategory] = useState("");
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });

  const queries = getQueries(source, category, dateFilter, searchQuery);
  const { data: news, isFetching, hasNextPage, fetchNextPage } = useInfiniteData<INews>(DataType.news, source, 6, queries);

  const handleSourceChange = (value: string) => {
    setSource(sources[+value]);
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
    <>
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
    </>
  );
};

const getQueries = (source: ISource | undefined, category: string, { from, to }: { from: string; to: string }, searchQuery?: string) => {
  let queries = "";
  if (searchQuery) queries += `&${source?.searchQueryParam}="${searchQuery}"`;
  if (category) queries += `&${source?.news.categoryQueryParam}=${category}`;
  if (from) queries += `&${source?.filteringByDate?.fromQueryParam}=${from}`;
  if (to) queries += `&${source?.filteringByDate?.toQueryParam}=${to}`;
  return queries;
};

export default NewsExplorer;
