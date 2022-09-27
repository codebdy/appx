import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name from "../name";
import locales from "./locales";
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
    name: 'PageContainer.HeaderActions',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'PageContainer.HeaderActions',
    designerProps: {
      droppable: true,
      draggable: false,
      deletable: false,
      cloneable: false,
      propsSchema: createFieldSchema(PageContainerSchema.HeaderActions),
    },
    designerLocales: PageContainerLocales.HeaderActions,
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
      propsSchema: createFieldSchema(PageContainerSchema.HeaderContent),
    },
    designerLocales: PageContainerLocales.HeaderContent,
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
      propsSchema: createFieldSchema(PageContainerSchema.HeaderContentExtra),
    },
    designerLocales: PageContainerLocales.HeaderContentExtra,
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
      propsSchema: createFieldSchema(PageContainerSchema.TabPanel),
    },
    designerLocales: PageContainerLocales.TabPanel,
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
      propsSchema: createFieldSchema(PageContainerSchema.FooterToolbar),
    },
    designerLocales: PageContainerLocales.FooterToolbar,
  }
]

export default behaviors