import { IPlugin } from "../../plugin-sdk/model";

export const rxPlugin: IPlugin = {
  id: "predefined.layouts",
  name: string;
  version: string;
  description?: string;
  components: {
    [device: string]: IMaterialComponent[];
  }
  model?: any;
}