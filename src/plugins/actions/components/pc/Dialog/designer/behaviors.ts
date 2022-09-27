import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name from "../name";
import { ContentLocles } from "./DialogContentDesigner/locales";
import { ContentSchema } from "./DialogContentDesigner/schema";
import { FooterLocales } from "./DialogFooterDesigner/locales";
import { FooterSchema } from "./DialogFooterDesigner/schema";
import { TitleLocales } from "./DialogTitleDesigner/locales";
import { TitleSchema } from "./DialogTitleDesigner/schema";
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
  },
  {
    name: 'Dialog.Title',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Dialog.Title',
    designerProps: {
      droppable: true,
      draggable: false,
      deletable: false,
      cloneable: false,
    },
    designerLocales: TitleLocales,
    schema: TitleSchema,
  },
  {
    name: 'Dialog.Content',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Dialog.Content',
    designerProps: {
      droppable: true,
      draggable: false,
      deletable: false,
      cloneable: false,
    },
    designerLocales: ContentLocles,
    schema: ContentSchema,
  },
  {
    name: 'Dialog.Footer',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Dialog.Footer',
    designerProps: {
      droppable: true,
      draggable: false,
      deletable: false,
      cloneable: false,
    },
    designerLocales: FooterLocales,
    schema: FooterSchema
  },
]

export default behaviors