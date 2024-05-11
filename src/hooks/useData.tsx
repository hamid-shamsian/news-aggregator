import { useQuery } from "@tanstack/react-query";
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

const useData = <T,>(dataType: DataType, source?: ISource, queries?: string) =>
  useQuery<T[], Error>({
    queryKey: source ? [dataType, source.name, queries] : ["no-source"],
    queryFn: () => (source ? fetchData<T>(dataType, source, queries) : Promise.reject()),
    placeholderData: prevData => prevData
  });

export default useData;
