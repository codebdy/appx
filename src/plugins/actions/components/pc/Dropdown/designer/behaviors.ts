import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name from "../name";
import { ButtonLocales } from "./ButtonDesigner/locales";
import { ButtonSchema } from "./ButtonDesigner/schema";
import locales from "./locales";
import { PopupPanelLocles } from "./PopupPanelDesigner/locales";
import { PopupPaneSchema } from "./PopupPanelDesigner/schema";
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
    name: 'Dropdown.PopupPanel',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Dropdown.PopupPanel',
    designerProps: {
      droppable: true,
      deletable: false,
      cloneable: false,
      draggable: false,
    },
    designerLocales: PopupPanelLocles,
    schema: PopupPaneSchema,
  },
  {
    name: 'Dropdown.Button',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Dropdown.Button',
    designerProps: {
      droppable: true,
      deletable: false,
      cloneable: false,
      draggable: false,
    },
    designerLocales: ButtonLocales,
    schema: ButtonSchema,
  },
]

export default behaviors