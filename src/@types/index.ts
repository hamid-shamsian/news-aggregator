export interface INews {
  author: string;
  title: string;
  description: string;
  image: string;
  content: string;
  publishedAt: string;
  sourceURL: string;
}

export interface IFieldsMapping {
  author: string | null;
  title: string;
  description: string | null;
  image: string | null;
  content: string | null;
  publishedAt: string;
  sourceURL: string;
}

export interface ISource {
  name: string;
  url: string;
  pathToNewsArrayInResponseBody: string;
  fieldsMapping: IFieldsMapping;
}
