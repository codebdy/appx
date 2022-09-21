import { IBehavior } from "packages/studio/src/plugin-sdk";
import { locales } from "../../locales";
import { schemaTabs } from "./schema";

export const behaviors: IBehavior[] = [
  {
    name: 'ProLayout',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ProLayout',
    designerProps: {
      droppable: true,
    },
    designerLocales: locales,
    propsTabs: schemaTabs,
  }
]