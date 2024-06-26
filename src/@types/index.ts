export interface INews {
  author: string;
  title: string;
  description: string;
  image: string;
  content: string;
  publishedAt: string;
  sourceURL: string;
}

export interface INewsFieldsMapping {
  author: string | null;
  title: string;
  description: string | null;
  image: string | null;
  content: string | null;
  publishedAt: string;
  sourceURL: string;
}

export interface ICategory {
  value: string;
  label: string;
}

export interface ICategoryFieldsMapping {
  value: string;
  label: string;
}

export interface INewsEndPoint {
  endPoint: string;
  categoryQueryParam: string;
  fieldsMapping: INewsFieldsMapping;
}

export interface ICategoriesEndPoint {
  endPoint: string;
  fieldsMapping: ICategoryFieldsMapping;
}

export enum DataType {
  news = "news", // the name should be used in config.json for news endpoint config object
  category = "categories" // the name should be used in config.json for categories endpoint config object
}

export interface ISource {
  name: string;
  isDefault?: boolean;
  baseURL: string;
  staticParams: string;
  pathToDataInResponseBody: string;
  pathToTotalInResponseBody: string;
  pageQueryParam: string;
  pageSizeQueryParam: string;
  searchQueryParam: string;
  [DataType.news]: INewsEndPoint;
  [DataType.category]?: ICategoriesEndPoint;
  staticCategories?: ICategory[];
  filteringByDate?: {
    fromQueryParam: string;
    toQueryParam: string;
  };
}

export interface IResponse<T> {
  dataArr: T[];
  total: number;
}

export interface IAction<T> {
  type: string;
  payload: T;
}

export interface IFilters {
  source: ISource | undefined;
  category: string;
  dateFilter: { from: string; to: string };
}
