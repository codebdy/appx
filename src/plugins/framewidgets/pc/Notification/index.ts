import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import ComponentDesigner from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { Notification } from "./view";

const material: IMaterialComponent = {
  name: Name,
  designer: ComponentDesigner,
  component: Notification,
  behaviors,
  resources
}

export default material