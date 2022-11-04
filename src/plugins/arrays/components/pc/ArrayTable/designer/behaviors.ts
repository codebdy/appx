import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import { createArrayExtraBehavior } from "../../ArrayBase";
import name from "../name";
import { ArrayTableColumnLocales, ArrayTableLocales } from "./locales";
import { ArrayTableColumnSchema, ArrayTableSchema } from "./schema";

const behaviors: IBehavior[] = [
  {
    name,
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === name,
    designerProps: {
      droppable: true,
    },
    designerLocales: ArrayTableLocales,
    schema: ArrayTableSchema,

  },
  ...createArrayExtraBehavior(name),
  {
    name: 'ArrayTable.Column',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ArrayTable.Column',
    designerProps: {
      droppable: true,
      allowDrop: (node) =>
        node.props['type'] === 'object' &&
        node.parent?.props?.['x-component'] === 'ArrayTable',
    },
    designerLocales: ArrayTableColumnLocales,
    schema: ArrayTableColumnSchema,
  }
];
export default behaviors