import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import LogService from "./logService";

const logService = new LogService<AxiosError>();

const apiGetRequest = axios.create({ method: "get" }); // because ONLY GET method is used in this app. so I specified the method here to avoid chaining .get() every time...

const errorHandler = async (error: AxiosError) => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) {
    logService.log(error);
    toast.error("Unexpected Error! (Maybe Connection Problem)");
  }

  return Promise.reject(error);
};

apiGetRequest.interceptors.response.use(null, errorHandler);

export default apiGetRequest;
