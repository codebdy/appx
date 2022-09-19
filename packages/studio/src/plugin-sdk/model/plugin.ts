import { IBehaviorCreator, IResourceCreator } from "@designable/core";
import { DnFC, DnComponent } from "@designable/react"

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

export interface IMaterialComponent {
  name: string;
  designer: DnFC<any> | DnComponent<any>;
  component: React.FC<any> | React.Component;
  resource?: IResourceCreator;
  behavior?: IBehaviorCreator;
}