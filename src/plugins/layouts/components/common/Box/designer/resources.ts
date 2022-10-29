import { IResourceCreator } from "@designable/core";

import Name from "../name";

const resources: IResourceCreator[] = [{
  icon: 'CardSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': Name,
        'x-component-props': {
          "style": {
            "alignItems": "center",
            "display": "flex",
            "width": "100%",
          }
        },
      },
    },
  ],
}]

export default resources;