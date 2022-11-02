import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import ComponentDesigner from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { Switch } from 'antd'

const material:IMaterialComponent = {
  name: Name,
  designer: ComponentDesigner,
  component: Switch,
  behaviors,
  resources
}

export default material;