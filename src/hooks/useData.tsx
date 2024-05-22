import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import apiGetRequest from "../services/apiClient";
import { getValueFromPath, mapToDataModel } from "../utils/utilFunctions";
import { ISource, DataType, IResponse } from "../@types";

const fetchData = async <T,>(dataType: DataType, source: ISource, queries?: string, signal?: AbortSignal): Promise<IResponse<T>> => {
  const { baseURL, staticParams, pathToDataInResponseBody, pathToTotalInResponseBody } = source;
  const { endPoint, fieldsMapping } = source[dataType]!; // because the dataType value should be neccessarily one of properties that are included in the source object but Typescript cannot make sure about it, i think i dont have any workaround but using non-null assertion operator to address this TS complain :(
  const URL = baseURL + endPoint + "?" + staticParams + (queries ?? "");
  const response = (await apiGetRequest(URL, { signal })).data;
  const dataArr = getValueFromPath(response, pathToDataInResponseBody);
  const total = getValueFromPath(response, pathToTotalInResponseBody);
  return { dataArr: dataArr.map((data: any) => mapToDataModel(dataType, data, fieldsMapping)), total };
};

export const useData = <T,>(dataType: DataType, source: ISource | undefined, queries?: string) =>
  useQuery<IResponse<T>, Error>({
    queryKey: [dataType, source?.name ?? "no-source", queries],
    queryFn: () => (source ? fetchData<T>(dataType, source, queries) : Promise.reject()),
    placeholderData: prevData => prevData
  });

export const useInfiniteData = <T,>(dataType: DataType, source: ISource | undefined, pageSize: number, queries: string = "") =>
  useInfiniteQuery<IResponse<T>, Error, InfiniteData<IResponse<T>>, [DataType, string, number, string], number>({
    queryKey: [dataType, source?.name ?? "no-source", pageSize, queries],
    queryFn: ({ pageParam, signal }) =>
      source
        ? fetchData<T>(dataType, source, queries + `&${source.pageSizeQueryParam}=${pageSize}&${source.pageQueryParam}=${pageParam}`, signal)
        : Promise.reject(),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => (allPages.length < lastPage.total / pageSize ? allPages.length + 1 : null)
  });
