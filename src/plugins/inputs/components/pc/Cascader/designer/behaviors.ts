import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name from "../name";
import { CascaderLocales } from "./locales";
import { CascaderSchema } from "./schema";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === Name,
    designerProps: {
      droppable: false,
    },
    designerLocales: CascaderLocales,
    schema: CascaderSchema,
  },

]

export default behaviors