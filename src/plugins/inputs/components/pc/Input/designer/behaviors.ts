import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name, { TextAreaName } from "../name";
import { InputLocales, TextAreaLocales } from "./locales";
import { InputSchema, TextAreaSchema } from "./schema";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === Name,
    designerProps: {
      droppable: false,
    },
    designerLocales: InputLocales,
    schema: InputSchema,
  },
  {
    name: TextAreaName,
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === TextAreaName,
    designerProps: {
      droppable: false,
    },
    designerLocales: TextAreaLocales,
    schema: TextAreaSchema,
  }
]

export default behaviors