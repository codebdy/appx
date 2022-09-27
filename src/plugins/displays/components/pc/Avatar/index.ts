import { AvatarDesigner } from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import { Avatar } from "./view";

const material: IMaterialComponent = {
  name: Name,
  designer: AvatarDesigner,
  component: Avatar,
  behaviors,
  resources
}

export default material;
