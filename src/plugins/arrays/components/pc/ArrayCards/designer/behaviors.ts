import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import { createArrayExtraBehavior } from "../../ArrayBase";
import name from "../name";
import { ArrayCardsLocales } from "./locales";
import { ArrayCardsSchema } from "./schema";

const behaviors: IBehavior[] = [
  {
    name,
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === name,
    designerProps: {
      droppable: true,
    },
    designerLocales: ArrayCardsLocales,
    schema: ArrayCardsSchema,

  },
  ...createArrayExtraBehavior(name)
];
export default behaviors