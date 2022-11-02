import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name from "../name";
import { SwitchLocales } from "./locales";
import { SwitchSchema } from "./schema";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === Name,
    designerProps: {
      droppable: false,
    },
    designerLocales: SwitchLocales,
    schema: SwitchSchema,
  },

]

export default behaviors