import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name from "../name";
import { RateLocales } from "./locales";
import { RateSchema } from "./schema";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === Name,
    designerProps: {
      droppable: false,
    },
    designerLocales: RateLocales,
    schema: RateSchema,
  },

]

export default behaviors