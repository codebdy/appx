import { IBehaviorCreator, IResourceCreator } from "@designable/core";
import { DnFC, DnComponent } from "@designable/react"
import { ISchema } from "@formily/json-schema";
import { IAppxAction } from "./action";

export interface IPlugin {
  //唯一标识，记住一定要唯一
  id: string;
  title: string;
  version: string;
  description?: string;
  components: {
    [device: string]: IMaterialComponent[];
  }
  model?: any;
  locales?: any;
  actions?: IAppxAction[];//action功能以后实现
  //templates?: ITemplate;
  dependencies?: {
    [name: string]: string; // name:version
  }
}

export enum FieldsType {
  Multiple = "Multiple",
  Single = "Single"
}


export interface IDisplayTabOptions {
  hasDataBindSource?: boolean,
  fieldSourceType?: FieldsType,
  hasPropTitle?: boolean,
}

export interface IPropsSchema {
  style?: boolean;
  props?: ISchema;
  display?: IDisplayTabOptions;
  actions?: string[];
  decorator?: boolean | ISchema;
}

export interface IBehavior extends IBehaviorCreator {
  schema?: IPropsSchema;
}

export interface IMaterialComponent {
  name: string;
  designer: DnFC<any> | DnComponent<any>;
  component: React.FC<any> | React.Component;
  resource?: IResourceCreator;
  behaviors?: IBehavior[];
}