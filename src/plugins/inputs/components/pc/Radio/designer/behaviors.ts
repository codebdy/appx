import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name from "../name";
import { RadioLocales } from "./locales";
import { RadioGroupSchema } from "./schema";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === Name,
    designerProps: {
      droppable: false,
    },
    designerLocales: RadioLocales,
    schema: RadioGroupSchema,
  },

]

export default behaviors