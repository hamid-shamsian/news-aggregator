import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import LogService from "./logService";
import config from "../../config.json";

const logService = new LogService<AxiosError>();

const apiClient = axios.create({ baseURL: config.API_BASE_URL });

const errorHandler = async (error: AxiosError) => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) {
    logService.log(error);
    toast.error("Unexpected Error! (Maybe Connection Problem)");
  }

  return Promise.reject(error);
};

apiClient.interceptors.response.use(null, errorHandler);

export default apiClient;
