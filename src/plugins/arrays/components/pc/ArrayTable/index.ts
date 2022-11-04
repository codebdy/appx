import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import { ArrayTableDesigner } from "./designer";
import { ArrayTable } from "@formily/antd";

const material: IMaterialComponent = {
  name: Name,
  designer: ArrayTableDesigner,
  component: ArrayTable,
  behaviors,
  resources
}

export default material;
