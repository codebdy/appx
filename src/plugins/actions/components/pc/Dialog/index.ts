import DialogDesigner from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import Dialog from "./view";

const material: IMaterialComponent = {
  name: Name,
  designer: DialogDesigner,
  component: Dialog,
  behaviors,
  resources
}

export default material;
