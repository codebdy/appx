import { IResourceCreator } from "@designable/core";
import Name from "../name";

const resources: IResourceCreator[] = [
  {
    icon: 'EntitySource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'void',
          'x-component': Name,
          'x-component-props': {
            title: "Page title",
            //subtitle: "PageContainer subtitle",
            hasBreadcrumb: false,
            hasGobackButton: false,
            hasActions: false,
            hasHeaderContent: false,
            hasHeaderContentExtra: false,
            hasTabs: false,
            hasFooterToolbar: false,
          },
        },
        children: [
          {
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'PageContainer.HeaderActions',
              'x-component-props': {
              },
            },
          },
          {
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'PageContainer.HeaderContent',
              'x-component-props': {
                gridSpan: 18
              },
            },
          },
          {
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'PageContainer.HeaderContentExtra',
              'x-component-props': {
                gridSpan: 6
              },
            },
          },
          {
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'PageContainer.TabPanel',
              'x-component-props': {
                title: `Unnamed title`,
              },
            },
          },
          {
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'PageContainer.FooterToolbar',
              'x-component-props': {
              },
            },
          },
        ]
      },
    ],
  }
]

export default resources;