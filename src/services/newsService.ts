import apiGetRequest from "./apiClient";

const getNews = async (url: string) => (await apiGetRequest(url)).data;

const newsService = {
  getNews
  // , maybe other methods...
};

export default newsService;
