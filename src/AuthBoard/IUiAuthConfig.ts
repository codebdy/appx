import { ICompoentAuthConfig, IMenuAuthConfig } from "../model";

export interface IUiAuthRow {
  name: string;
  label?: string;
  refuse?: boolean;
  menuConfig?: IMenuAuthConfig;
  componentConfig?: ICompoentAuthConfig;
}
