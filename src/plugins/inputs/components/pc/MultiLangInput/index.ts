import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import Name from "./name";
import ComponentDesigner from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import { MultiLangInput } from "./view";

const material:IMaterialComponent = {
  name: Name,
  designer: ComponentDesigner,
  component: MultiLangInput,
  behaviors,
  resources
}

export default material;