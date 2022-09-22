import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import { NAME } from "../consts";
import { ProLayoutDesigner } from "./designer";
import { behavior } from "./designer/behavior";
import { resource } from "./designer/resource";
import { ProLayout } from "./view";

const mobile: IMaterialComponent = {
  name: NAME,
  designer: ProLayoutDesigner,
  component: ProLayout,
  behavior,
  resource
}

export default mobile;