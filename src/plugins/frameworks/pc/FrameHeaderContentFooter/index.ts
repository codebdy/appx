import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import { FrameHeaderContentFooterDesigner } from "./designer";
import { behaviors } from "./designer/behaviors";
import { resource } from "./designer/resource";
import { FrameHeaderContentFooter } from "./view";

export default {
  name: "FrameHeaderContentFooter",
  designer: FrameHeaderContentFooterDesigner,
  component: FrameHeaderContentFooter,
  behaviors,
  resource
}
