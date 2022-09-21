import { IBehavior } from "../../src/plugin-sdk";
import { locales } from "../../locales";
import { schema } from "./schema";

export const behaviors: IBehavior[] = [
  {
    name: 'ProLayout',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ProLayout',
    designerProps: {
      droppable: true,
    },
    designerLocales: locales,
    schema,
  }
]