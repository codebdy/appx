import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import Dialog from "./view";
import { DialogDesigner } from "./designer";

const material: IMaterialComponent = {
  name: Name,
  designer: DialogDesigner,
  component: Dialog,
  behaviors,
  resources
}

export default material;
