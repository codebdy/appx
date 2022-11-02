import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name from "../name";
import { PasswordLocales } from "./locales";
import { PasswordSchema } from "./schema";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === Name,
    designerProps: {
      droppable: false,
    },
    designerLocales: PasswordLocales,
    schema: PasswordSchema,
  },

]

export default behaviors