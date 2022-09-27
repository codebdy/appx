import { IResourceCreator } from "@designable/core";
import Name from "../name";

const resources: IResourceCreator[] = [
  {
    icon: 'OpenPageButtonSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'void',
          'x-component': Name,
          'x-component-props': {
            title: "Dialog",
            type: "primary",
            footer: true
          },
        },
        children: [
          {
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'Dialog.Title',
              'x-component-props': {
                title: "Title",
              },
            },
          },
          {
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'Dialog.Content',
              'x-component-props': {
              },
            },
          },
          {
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'Dialog.Footer',
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
                    "title": "$inline:{\"zh-CN\":\"取消\"}",
                    "type": "default"
                  },
                },
              },
              {
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'Button',
                  'x-component-props': {
                    "title": "$inline:{\"zh-CN\":\"确定\"}",
                    "type": "primary"
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  }
  
]

export default resources;