import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import ComponentDesigner from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { Rate } from 'antd'

const material:IMaterialComponent = {
  name: Name,
  designer: ComponentDesigner,
  component: Rate,
  behaviors,
  resources
}

export default material;