import { IResourceCreator } from "@designable/core";
import Name from "../name";

const resources: IResourceCreator[] = [
  {
    icon: 'GridSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'void',
          'x-component': Name,
        },
        children: [
          {
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
            },
          },
          {
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
            },
          },
          {
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
            },
          },
        ],
      },
    ],
  }
]

export default resources;