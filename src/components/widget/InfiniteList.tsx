import { ComponentType, Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Box from "@mui/material/Box";
import LoadingSpinner from "../common/LoadingSpinner";
import { IResponse } from "../../@types";

interface InfiniteNewsContainerProps<T> {
  data: IResponse<T>[];
  nextFn: () => void;
  hasMore: boolean;
  children: ComponentType<{ key: number; item: T }>;
}

const InfiniteList = <T,>({ data, nextFn, hasMore, children: ItemComponent }: InfiniteNewsContainerProps<T>) => {
  const fetchedItemsCount = data.reduce((total, page) => total + page.dataArr.length, 0);

  return (
    <InfiniteScroll dataLength={fetchedItemsCount} hasMore={hasMore} next={() => nextFn()} loader={<LoadingSpinner message='Loading more...' />}>
      <Box component='ul' sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center", p: 0 }}>
        {data.map((page, i) => (
          <Fragment key={i}>
            {page.dataArr.map((item, j) => (
              <ItemComponent key={j} item={item} />
            ))}
          </Fragment>
        ))}
      </Box>
    </InfiniteScroll>
  );
};

export default InfiniteList;
