import { IPlugin } from "@appx/plugin-sdk";
import { IPluginInfo } from "../model";


export enum PluginType {
  Predefined = "predefined",
  Normal = "normal",
  Debug = "debug"
}

export enum PluginStatus {
  Loading = "loading",
  Error = "error",
  Normal = "normal"
}

export interface IInstalledPlugin {
  pluginInfo: IPluginInfo;
  plugin?: IPlugin;
  type: PluginType;
  status: PluginStatus;
}
