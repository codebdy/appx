import { ICompoentAuthConfig, IMenuAuthConfig } from "../model";

export interface IUiAuthRow {
  name: string;
  label?: string;
  refused?: boolean;
  menuConfig?: IMenuAuthConfig;
  componentConfig?: ICompoentAuthConfig;
}
