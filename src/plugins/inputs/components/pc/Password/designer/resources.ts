import { IResourceCreator } from "@designable/core";
import Name from "../name";

const resources: IResourceCreator[] = [
  {
    icon: 'PasswordSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: Name,
          'x-decorator': 'FormItem',
          'x-component': Name,
        },
      },
    ],
  },
]

export default resources;