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
  pathToDataInResponseBody: string;
  categoryQueryParam: string;
  fieldsMapping: INewsFieldsMapping;
}

export interface ICategoriesEndPoint {
  endPoint: string;
  pathToDataInResponseBody: string;
  fieldsMapping: ICategoryFieldsMapping;
}

export interface ISource {
  name: string;
  isDefault?: boolean;
  baseURL: string;
  apiKeyParam: string;
  news: INewsEndPoint;
  categories: ICategoriesEndPoint | string[];
}
