import ComponentDesigner from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { Row as AntdRow } from 'antd'
import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";

const material: IMaterialComponent = {
  name: Name,
  designer: ComponentDesigner,
  component: AntdRow,
  behaviors,
  resources
}

export default material;
