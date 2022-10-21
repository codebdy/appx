import { ID } from "~/shared";

export interface ILang {
  key: string,
  abbr: string,
}

export interface ILangLocal {
  id: ID;
  name: string;
  appUuid?: string;
  schemaJson?: any;
}

export interface ILangLocalInput {
  id?: ID;
  name?: string;
  appUuid?: string;
  schemaJson?: any;
}

