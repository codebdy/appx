import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name from "../name";
import { TransferLocales } from "./locales";
import { TransferSchema } from "./schema";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === Name,
    designerProps: {
      droppable: false,
    },
    designerLocales: TransferLocales,
    schema: TransferSchema,
  },

]

export default behaviors