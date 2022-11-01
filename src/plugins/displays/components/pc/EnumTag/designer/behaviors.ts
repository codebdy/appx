import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name from "../name";
import { EnumTagLocales } from "./locales";
import { EnumTagSchema } from "./schema";


const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === Name,
    designerProps: {
      droppable: false,
    },
    designerLocales: EnumTagLocales,
    schema: EnumTagSchema
  }
]

export default behaviors