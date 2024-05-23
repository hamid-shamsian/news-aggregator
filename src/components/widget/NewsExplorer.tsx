import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import DynamicCategoriesBox from "./DynamicCategoriesBox";
import DateFilterBox from "./DateFilterBox";
import InfiniteList from "./InfiniteList";
import NewsCard from "./NewsCard";
import SelectBox from "../common/SelectBox";
import LoadingSpinner from "../common/LoadingSpinner";
import { useInfiniteData } from "../../hooks/useData";
import useFilters from "../../hooks/useFilters";
import { filtersActions } from "../../redux/features/filtersSlice";
import { DataType, INews, ISource } from "../../@types";

interface NewsAggregatorProps {
  sources: ISource[]; // sources to be assigned from the parent component in order to be able to use this NewsExplorer with different lists of sources each time.
  searchQuery?: string;
}

const pageSize = 6;

const NewsExplorer = ({ sources, searchQuery }: NewsAggregatorProps) => {
  const sourceOptions = useMemo(() => sources.map(({ name, isDefault }, i) => ({ label: name, value: String(i), isDefault })), [sources]);

  const dispatch = useDispatch();
  const { source, category, dateFilter } = useFilters();

  const queryClient = useQueryClient();
  const queries = getQueries(source, category, dateFilter, searchQuery);
  const { data: news, isFetching, hasNextPage, fetchNextPage } = useInfiniteData<INews>(DataType.news, source, pageSize, queries);

  const cancelFetch = () => {
    queryClient.cancelQueries({ queryKey: [DataType.news, source?.name ?? "no-source", pageSize, queries] });
  };

  const handleSourceChange = (value: string) => {
    dispatch(filtersActions.changeSource(sources[+value]));
  };

  const handleCategoryChange = (value: string) => {
    dispatch(filtersActions.changeCategory(value));
  };

  const handleDateFilter = (values: { from: string; to: string }) => {
    dispatch(filtersActions.changeDateFilter(values));
  };

  const sourcePersistedValue = source && sourceOptions.findIndex(opt => opt.label === source?.name).toString();

  return (
    <>
      <Box sx={{ alignSelf: "stretch", display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
        <SelectBox label='Source' options={sourceOptions} initialValue={sourcePersistedValue} onValueChange={handleSourceChange} />

        {source?.staticCategories && (
          <SelectBox label='Category' options={source.staticCategories} initialValue={category} onValueChange={handleCategoryChange} />
        )}
        {source?.categories && <DynamicCategoriesBox source={source} initialValue={category} onCategoryChange={handleCategoryChange} />}
      </Box>

      {source?.filteringByDate && <DateFilterBox initialValues={dateFilter} onChangeValues={handleDateFilter} />}

      <InfiniteList<INews> data={news?.pages ?? []} hasMore={hasNextPage} nextFn={fetchNextPage}>
        {({ item }) => <NewsCard news={item} />}
      </InfiniteList>

      {isFetching && !news && <LoadingSpinner fullPage={true} onCancel={cancelFetch} layout='vertical' />}
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
