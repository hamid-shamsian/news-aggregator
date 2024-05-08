import apiGetRequest from "./apiClient";

const getAllNewsByQueries = async (url: string, queries: string[]) => {
  const allQueries = queries.join("&");
  const res = await apiGetRequest(url + "&" + allQueries);
  return res.data;
};

const newsService = {
  getAllNewsByQueries
  // , maybe other methods...
};

export default newsService;
