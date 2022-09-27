import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import FormButtonGroup from "./view";
import FormButtonGroupDesigner from "./designer";

const material:IMaterialComponent = {
  name: Name,
  designer: FormButtonGroupDesigner,
  component: FormButtonGroup,
  behaviors,
  resources
}

export default material;