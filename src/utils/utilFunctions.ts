import { toast } from "react-toastify";
import { IFieldsMapping, INews } from "../@types";
import LogService from "./../services/logService";

const logService = new LogService<string>();

export const getValueFromPath = (object: { [key: string]: any }, path: string): any => {
  const pathArray = path.split(".");
  for (let key of pathArray) {
    object = object[key];
    if (object === undefined) {
      toast.error("Something went wrong!");
      logService.log("Path to the intended property is wrong! Consider checking 'sources' config...");
      break;
    }
  }
  return object;
};

export const mapToNewsModel = (
  news: { [key: string]: any },
  { author, title, description, image, content, publishedAt, sourceURL }: IFieldsMapping
): INews => ({
  author: author ? news[author] : "No Author",
  title: news[title],
  description: description ? news[description] : "No Description...",
  image: image ? news[image] : "/no-image.svg",
  content: content ? news[content] : "No Content! Visit Source Link to Read More...",
  publishedAt: news[publishedAt],
  sourceURL: news[sourceURL]
});
