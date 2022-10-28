import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name from "../name";
import { ListHeaderLocales } from "./ListHeaderDesigner/locales";
import { ListHeaderSchema } from "./ListHeaderDesigner/schema";
import locales  from "./locales";
import schema from "./schema";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === Name,
    designerProps: {
      droppable: true,
    },
    designerLocales: locales,
    schema,
  },
  {
    name: 'GridList.Header',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'GridList.Header',
    designerProps: {
      droppable: true,
      deletable: false,
      cloneable: false,
    },
    designerLocales: ListHeaderLocales,
    schema: ListHeaderSchema
  }
]

export default behaviors