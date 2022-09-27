import { BooleanViewDesigner } from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import { BooleanView } from "./view";

const material: IMaterialComponent = {
  name: Name,
  designer: BooleanViewDesigner,
  component: BooleanView,
  behaviors,
  resources
}

export default material;
