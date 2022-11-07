import ComponentDesigner from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import { IconView } from "~/plugin-sdk";

const material: IMaterialComponent = {
  name: Name,
  designer: ComponentDesigner,
  component: IconView,
  behaviors,
  resources
}

export default material;
