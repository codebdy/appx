import { Device } from "@rxdrag/appx-plugin-sdk";
import { ICompoentAuthConfig, IMenuAuthConfig } from "../model";

export interface IUiAuthRow {
  name: string;
  label?: string;
  refused?: boolean;
  menuItemUuid: string;
  menuConfig?: IMenuAuthConfig;
  device: Device;
  componentConfig?: ICompoentAuthConfig;
}
