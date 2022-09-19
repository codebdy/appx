import { IMaterialComponent } from "./material";

export interface IPlugin {
  //唯一标识，记住一定要唯一
  id: string;
  name: string;
  version: string;
  description?: string;
  components: {
    [device: string]: IMaterialComponent[];
  }
  model?: any;
}