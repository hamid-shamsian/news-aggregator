import { toast } from "react-toastify";
import LogService from "./../services/logService";
import { INewsFieldsMapping, INews, ICategoryFieldsMapping, ICategory, DataType } from "../@types";

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

export const mapToDataModel = (
  dataType: DataType,
  data: { [key: string]: any },
  fieldsMapping: INewsFieldsMapping | ICategoryFieldsMapping
): INews | ICategory => {
  switch (dataType) {
    case DataType.news:
      const { author, title, description, image, content, publishedAt, sourceURL } = fieldsMapping as INewsFieldsMapping;
      return {
        author: author ? data[author] : "No Author",
        title: data[title],
        description: description ? data[description] : "No Description...",
        image: image ? data[image] : "/no-image.svg",
        content: content ? data[content] : "No Content! Visit Source Link to Read More...",
        publishedAt: data[publishedAt],
        sourceURL: data[sourceURL]
      };
    case DataType.category:
      const { value, label } = fieldsMapping as ICategoryFieldsMapping;
      return {
        value: data[value],
        label: data[label]
      };
  }
};
