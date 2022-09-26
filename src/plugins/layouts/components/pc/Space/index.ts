import ComponentDesigner from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { Space as FormilySpace } from '@formily/antd'
import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";

const material: IMaterialComponent = {
  name: Name,
  designer: ComponentDesigner,
  component: FormilySpace,
  behaviors,
  resources
}

export default material;
