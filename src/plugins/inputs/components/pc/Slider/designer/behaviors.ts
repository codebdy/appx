import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name from "../name";
import { SliderLocales } from "./locales";
import { SliderSchema } from "./schema";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === Name,
    designerProps: {
      droppable: false,
    },
    designerLocales: SliderLocales,
    schema: SliderSchema,
  },

]

export default behaviors