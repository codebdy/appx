import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name from "../name";
import { TreeSelectLocales } from "./locales";
import { TreeSelectSchema } from "./schema";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === Name,
    designerProps: {
      droppable: false,
    },
    designerLocales: TreeSelectLocales,
    schema: TreeSelectSchema,
  },

]

export default behaviors