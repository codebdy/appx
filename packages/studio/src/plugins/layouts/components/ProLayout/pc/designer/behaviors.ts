import { locales } from "../../locales";
import { schema } from "./schema";

export const behaviors = [
  {
    name: 'ProLayout',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ProLayout',
    designerProps: {
      droppable: true,
      propsSchema: schema,
    },
    designerLocales: locales,
  }
]