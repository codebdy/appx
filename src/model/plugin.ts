import { ID } from "~/shared";

export enum PluginType {
  uploaded = "uploaded",
  debug = "debug",
  market = "market"
}

export interface IPluginInfo {
  id?: ID;
  appUuid?: string;
  title?: string;
  url?: string;
  pluginId?: string,
  type?: PluginType,
  description?: string,
  version?: string,
}


export interface IPluginInfoInput {
  id?: ID;
  appUuid?: string;
  title?: string;
  url?: string;
  type?: PluginType,
  description?: string;
  version?: string;
  pluginId: string;
}
