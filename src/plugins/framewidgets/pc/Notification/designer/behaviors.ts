import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name from "../name";
import locales from "./locales";
import schema from "./schema";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === Name,
    designerProps: {
      droppable: false,
    },
    designerLocales: locales,
    schema,
  }
]

export default behaviors