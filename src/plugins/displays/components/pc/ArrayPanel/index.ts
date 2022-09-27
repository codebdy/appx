import { ArrayPanelDesigner } from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import  { ArrayPanel }  from "./view";

const material: IMaterialComponent = {
  name: Name,
  designer: ArrayPanelDesigner,
  component: ArrayPanel,
  behaviors,
  resources
}

export default material;
