import { ArrayCardsDesigner } from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import { ArrayCards } from "@formily/antd";

const material: IMaterialComponent = {
  name: Name,
  designer: ArrayCardsDesigner,
  component: ArrayCards,
  behaviors,
  resources
}

export default material;
