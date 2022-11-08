import { ID } from "~/shared";
import { IApp } from "./app";

export interface ITemplateInfo {
  name?: string;
  uuid?: string;
  imageUrl?: string;
  dependencies?: any;
  schemaJson?: any;
}

export interface ITemplateTab {
  title: string;
  uuid: string;
  collopsesItems: ITemplageCollapseItem[];
}
export interface ITemplageCollapseItem {
  title: string;
  uuid: string;
  templates: string[];
}

export interface ITemplateConfig {
  id: ID;
  app?: IApp;
  schemaJson?: {
    tabs: ITemplateTab[],
  },
}