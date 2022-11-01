import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import { EnumTag } from "./view";
import { EnumTagDesigner } from "./designer";

const material: IMaterialComponent = {
  name: Name,
  designer: EnumTagDesigner,
  component: EnumTag,
  behaviors,
  resources
}

export default material;
