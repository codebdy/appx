import { Device } from "@rxdrag/appx-plugin-sdk";
import { IComponentAuthConfig, IMenuAuthConfig } from "../model";

export interface IUiAuthRow {
  name: string;
  label?: string;
  refused?: boolean;
  menuItemUuid: string;
  menuConfig?: IMenuAuthConfig;
  device: Device;
  componentConfig?: IComponentAuthConfig;
}
