import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name from "../name";
import FooterToolbarLocales from "./FooterToolbarDesigner/locales";
import FooterToolbarSchema from "./FooterToolbarDesigner/schema";
import HeaderActionsLocales from "./HeaderActionsDesigner/locales";
import HeaderActionsSchema from "./HeaderActionsDesigner/schema";
import HeaderContentLocales from "./HeaderContentDesigner/locales";
import HeaderContentSchema from "./HeaderContentDesigner/schema";
import HeaderContentExtraLocales from "./HeaderContentExtraDesigner/locales";
import HeaderContentExtraSchema from "./HeaderContentExtraDesigner/schema";
import locales from "./locales";
import TabPanelLocales from "./PageTabPanelDesigner/locales";
import TabPanelSchema from "./PageTabPanelDesigner/schema";
import PageTitleLocales from "./PageTitleDesigner/locales";
import PageTitleSchema from "./PageTitleDesigner/schema";
import schema from "./schema";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: [],
    selector: (node) => node.props['x-component'] === Name,
    designerProps: {
      droppable: true,
    },
    designerLocales: locales,
    schema: schema,
  },
  {
    name: 'PageContainer.PageTitle',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'PageContainer.PageTitle',
    designerProps: {
      droppable: true,
      draggable: false,
      deletable: false,
      cloneable: false,
    },
    designerLocales: PageTitleLocales,
    schema: PageTitleSchema,
  },
  {
    name: 'PageContainer.HeaderActions',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'PageContainer.HeaderActions',
    designerProps: {
      droppable: true,
      draggable: false,
      deletable: false,
      cloneable: false,
    },
    designerLocales: HeaderActionsLocales,
    schema: HeaderActionsSchema,
  },
  {
    name: 'PageContainer.HeaderContent',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'PageContainer.HeaderContent',
    designerProps: {
      droppable: true,
      draggable: false,
      deletable: false,
      cloneable: false,
    },
    designerLocales: HeaderContentLocales,
    schema: HeaderContentSchema
  },
  {
    name: 'PageContainer.HeaderContentExtra',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'PageContainer.HeaderContentExtra',
    designerProps: {
      droppable: true,
      draggable: false,
      deletable: false,
      cloneable: false,
    },
    designerLocales: HeaderContentExtraLocales,
    schema: HeaderContentExtraSchema,
  },
  {
    name: 'PageContainer.TabPanel',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'PageContainer.TabPanel',
    designerProps: {
      droppable: true,
      draggable: false,
      deletable: false,
      cloneable: false,
    },
    designerLocales: TabPanelLocales,
    schema: TabPanelSchema,
  },
  {
    name: 'PageContainer.FooterToolbar',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'PageContainer.FooterToolbar',
    designerProps: {
      droppable: true,
      draggable: false,
      deletable: false,
      cloneable: false,
    },
    designerLocales: FooterToolbarLocales,
    schema: FooterToolbarSchema,
  }
]

export default behaviors