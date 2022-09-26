import Name from "../name";
import { IResourceCreator } from "@designable/core";

const resources: IResourceCreator[] = [{
  icon: 'Menu',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': Name,
        'x-component-props': {
        },
      },
    },
  ],
}]

export default resources;