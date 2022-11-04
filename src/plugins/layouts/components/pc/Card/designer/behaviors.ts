import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name from "../name";
import { CardLocales } from "./locales";
import { CardSchema } from "./schema";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === Name,
    designerProps: {
      droppable: true,
    },
    designerLocales: CardLocales,
    schema: CardSchema
  }
]

export default behaviors