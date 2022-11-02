import Name from "../name";
import { IResourceCreator } from "@designable/core";

const resources: IResourceCreator[] = [{
  icon: 'CardSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': Name,
        'x-component-props': {
          mode: "inline"
        },
      },
    },
  ],
}]

export default resources;