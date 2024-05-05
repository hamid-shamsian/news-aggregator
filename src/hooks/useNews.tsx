import { useQuery } from "@tanstack/react-query";
import { INews, ISource } from "../@types";
import newsService from "../services/newsService";
import { getValueFromPath, mapToNewsModel } from "../utils/utilFunctions";

const fetchNews = async ({ url, pathToNewsArrayInResponseBody, fieldsMapping }: ISource, queries: string[]) => {
  const response = await newsService.getAllNewsByQueries(url, queries);
  const newsArr = getValueFromPath(response, pathToNewsArrayInResponseBody);
  return newsArr.map((news: any) => mapToNewsModel(news, fieldsMapping)) as INews[];
};

const useNews = (source: ISource, queries: string[]) =>
  useQuery<INews[], Error>({
    queryKey: [source.name, queries.join("")],
    queryFn: () => fetchNews(source, queries),
    placeholderData: prevData => prevData
  });

export default useNews;
