import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name from "../name";
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
    },
    designerLocales: PopupPanelLocles,
    schema: PopupPaneSchema,
  },
]

export default behaviors