import { useQuery } from "@tanstack/react-query";
import newsService from "../services/newsService";
import { getValueFromPath, mapToNewsModel } from "../utils/utilFunctions";
import { INews, ISource } from "../@types";

const fetchNews = async (
  { baseURL, staticParams, news: { endPoint, pathToDataInResponseBody, fieldsMapping } }: ISource,
  queries: string
): Promise<INews[]> => {
  const newsURL = baseURL + endPoint + "?" + staticParams;
  const response = await newsService.getNews(newsURL + queries);
  const newsArr = getValueFromPath(response, pathToDataInResponseBody);
  return newsArr.map((news: any) => mapToNewsModel(news, fieldsMapping));
};

const useNews = (source: ISource | undefined, queries: string) =>
  useQuery<INews[], Error>({
    queryKey: source ? [source.name, queries] : ["no-source"],
    queryFn: () => (source ? fetchNews(source, queries) : Promise.reject()),
    placeholderData: prevData => prevData
  });

export default useNews;
