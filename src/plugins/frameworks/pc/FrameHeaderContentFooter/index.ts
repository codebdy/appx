import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import { FrameHeaderContentFooterDesigner } from "./designer";
import { behaviors } from "./designer/behaviors";
import { resource } from "./designer/resource";
import { Name } from "./name";
import { FrameHeaderContentFooter } from "./view";

export default {
  name: Name,
  designer: FrameHeaderContentFooterDesigner,
  component: FrameHeaderContentFooter,
  behaviors,
  resource
}
