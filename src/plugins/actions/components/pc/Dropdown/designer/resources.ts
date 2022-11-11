import { IResourceCreator } from "@designable/core";
import Name from "../name";

const resources: IResourceCreator[] = [
  {
    icon: 'SelectSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'void',
          'x-component': Name,
          'x-component-props': {
            placement: "bottomRight",
            trigger: ['click']
          },
        },
        children: [
          {
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'Dropdown.PopupPanel',
              'x-component-props': {
              },
            },
          },
          {
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'Dropdown.Button',
              'x-component-props': {
                type: "primary",
                title: "Dropdown",
                showDropdownIcon: true,
              },
            },
          },
        ],
      },
    ],
  }
]

export default resources;