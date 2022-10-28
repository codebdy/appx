import { ImageDesigner } from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import { Image } from "./view";

const material: IMaterialComponent = {
  name: Name,
  designer: ImageDesigner,
  component: Image,
  behaviors,
  resources
}

export default material;
