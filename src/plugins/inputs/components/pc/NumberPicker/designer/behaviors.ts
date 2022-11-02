import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name from "../name";
import { NumberPickerLocales } from "./locales";
import { NumberPickerSchema } from "./schema";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === Name,
    designerProps: {
      droppable: false,
    },
    designerLocales: NumberPickerLocales,
    schema: NumberPickerSchema,
  },

]

export default behaviors