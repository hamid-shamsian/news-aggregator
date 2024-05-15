import { Fragment, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InfiniteScroll from "react-infinite-scroll-component";
import SelectBox from "../components/common/SelectBox";
import LoadingSpinner from "../components/common/LoadingSpinner";
import DynamicCategoriesBox from "../components/widget/DynamicCategoriesBox";
import UncontrolledDatePicker, { IDatePickerHandle } from "../components/widget/UncontrolledDatePicker";
import NewsCard from "../components/widget/NewsCard";
import { useInfiniteData } from "../hooks/useData";
import { DataType, INews, ISource } from "../@types";
import config from "../../config.json";

const { SOURCES } = config;
const sourceOptions = SOURCES.map(({ name, isDefault }, i) => ({ label: name, value: String(i), isDefault }));

const FeedPage = () => {
  const [source, setSource] = useState<ISource>();
  const [category, setCategory] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const fromDateRef = useRef<IDatePickerHandle>(null);
  const toDateRef = useRef<IDatePickerHandle>(null);

  const queries = getQueries(source, category, fromDate, toDate);
  const { data: newsArr, isFetching, hasNextPage, fetchNextPage } = useInfiniteData<INews>(DataType.news, source, queries);

  const handleSourceChange = (value: string) => {
    setSource(SOURCES[+value]);
    setCategory("");
    setFromDate("");
    setToDate("");
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleFilterDate = () => {
    setFromDate(fromDateRef.current?.getValue() ?? "");
    setToDate(toDateRef.current?.getValue() ?? "");
  };

  const fetchedNewsCount = newsArr?.pages.reduce((total, page) => total + page.length, 0) ?? 0;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      <Typography variant='h3' component='h1'>
        News Feed
      </Typography>

      <Box sx={{ alignSelf: "stretch", display: "flex", gap: 5, flexWrap: "wrap" }}>
        <SelectBox label='Source' options={sourceOptions} onValueChange={handleSourceChange} />

        {source?.staticCategories && <SelectBox label='Category' options={source.staticCategories} onValueChange={handleCategoryChange} />}
        {source?.categories && <DynamicCategoriesBox source={source} onCategoryChange={handleCategoryChange} />}

        {source?.filteringByDate && (
          <Box sx={{ width: "100%", display: "grid", gap: 5, gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" } }}>
            <UncontrolledDatePicker label='From' ref={fromDateRef} />
            <UncontrolledDatePicker label='To' ref={toDateRef} />
            <Button variant='outlined' onClick={handleFilterDate} sx={{ py: 1.9 }}>
              Apply Date Filters
            </Button>
          </Box>
        )}
      </Box>

      <InfiniteScroll
        dataLength={fetchedNewsCount}
        hasMore={hasNextPage}
        next={() => fetchNextPage()}
        loader={<LoadingSpinner message='Loading more...' />}
      >
        <Box component='ul' sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center", p: 0 }}>
          {newsArr?.pages.map((page, i) => (
            <Fragment key={i}>
              {page.map((news, j) => (
                <NewsCard key={j} news={news} />
              ))}
            </Fragment>
          ))}
        </Box>
      </InfiniteScroll>

      {isFetching && !newsArr && <LoadingSpinner fullPage={true} />}
    </Box>
  );
};

const getQueries = (source: ISource | undefined, category: string, fromDate: string, toDate: string) => {
  let queries = "";
  if (category) queries += "&" + `${source?.news.categoryQueryParam}=${category}`;
  if (fromDate) queries += "&" + `${source?.filteringByDate?.fromQueryParam}=${fromDate}`;
  if (toDate) queries += "&" + `${source?.filteringByDate?.toQueryParam}=${toDate}`;
  return queries;
};

export default FeedPage;
