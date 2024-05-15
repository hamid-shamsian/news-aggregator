import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import apiGetRequest from "../services/apiClient";
import { getValueFromPath, mapToDataModel } from "../utils/utilFunctions";
import { ISource, DataType } from "../@types";

const fetchData = async <T,>(dataType: DataType, source: ISource, queries?: string): Promise<T[]> => {
  const { baseURL, staticParams } = source;
  const { endPoint, pathToDataInResponseBody, fieldsMapping } = source[dataType]!;
  const URL = baseURL + endPoint + "?" + staticParams;
  const response = (await apiGetRequest(URL + (queries ?? ""))).data;
  const dataArr = getValueFromPath(response, pathToDataInResponseBody);
  return dataArr.map((data: any) => mapToDataModel(dataType, data, fieldsMapping));
};

export const useData = <T,>(dataType: DataType, source?: ISource, queries?: string) =>
  useQuery<T[], Error>({
    queryKey: [dataType, source?.name ?? "no-source", queries],
    queryFn: () => (source ? fetchData<T>(dataType, source, queries) : Promise.reject()),
    placeholderData: prevData => prevData
  });

export const useInfiniteData = <T,>(dataType: DataType, source?: ISource, queries: string = "") =>
  useInfiniteQuery<T[], Error, InfiniteData<T[]>, [DataType, string, string], number>({
    queryKey: [dataType, source?.name ?? "no-source", queries],
    queryFn: ({ pageParam }) => (source ? fetchData<T>(dataType, source, queries + `&page-size=6&page=${pageParam}`) : Promise.reject()),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => (lastPage.length > 0 ? allPages.length + 1 : undefined)
  });
