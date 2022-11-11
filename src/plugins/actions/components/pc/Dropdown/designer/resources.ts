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
            type: "primary",
            title: "Dropdown",
            showDropdownIcon: true,
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
        ],
      },
    ],
  }
]

export default resources;