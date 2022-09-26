import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import Name from "./name";
import { Input } from '@formily/antd'
import ComponentDesigner from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";

const material:IMaterialComponent = {
  name: Name,
  designer: ComponentDesigner,
  component: Input,
  behaviors,
  resources
}

export default material;