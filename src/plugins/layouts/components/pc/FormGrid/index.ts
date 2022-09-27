import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import FormGridDesigner from "./designer";
import { FormGrid } from "@formily/antd";

const material:IMaterialComponent = {
  name: Name,
  designer: FormGridDesigner,
  component: FormGrid,
  behaviors,
  resources
}

export default material;