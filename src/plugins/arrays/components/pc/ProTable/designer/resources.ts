import { IResourceCreator } from "@designable/core";
import Name from "../name";

const resources: IResourceCreator[] = [
  {
    icon: 'DataQueryListSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'void',
          'x-component': Name,
          'x-component-props': {
            hasQueryForm: true,
            hasToolbar: true,
            hasBatchActions: true,
            selectable: true,
          },
        },
        children: [
          {
            componentName: 'Field',
            props: {
              type: 'object',
              'x-component': 'ProTable.QueryForm',
              'x-component-props': {
                collapsiable: true,
                colon: true,
              },
            },
          },
          {
            componentName: 'Field',
            props: {
              type: 'object',
              'x-component': 'ProTable.Toolbar',
              'x-component-props': {
              },
            },
            children: [
              {
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'ProTable.ToolbarActions',
                  'x-component-props': {
                  },
                },
                children: [
                  {
                    componentName: 'Field',
                    props: {
                      type: 'void',
                      'x-component': 'Button',
                      'x-component-props': {
                        title: "New",
                        "type": "primary",
                        "icon": {
                          "iconKey": "PlusOutlined"
                        }
                      },
                    },
                  }
                ]
              },
              {
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'Text',
                  'x-component-props': {
                    content: "Title",
                  },
                },
              }
            ]
          },
          {
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'ProTable.BatchActions',
              'x-component-props': {
              },
            },
          },
          {
            componentName: 'Field',
            props: {
              type: 'array',
              'x-component': 'ProTable.Table',
              'x-component-props': {
              },
            }
          },
        ]
      },
    ],
  }
]

export default resources;