import { IResourceCreator } from "@designable/core";
import Name from "../name";

const resources: IResourceCreator[] = [
  {
    icon: 'SubmitButtonSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'void',
          'x-component': Name,
          'x-component-props': {
            formItem: true,
            sticky: false,
            align: "left",
          },
        },
      },
    ],
  }
]

export default resources;