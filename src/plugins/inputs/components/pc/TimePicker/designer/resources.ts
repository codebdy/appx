import { IResourceCreator } from "@designable/core";
import Name, { TimeRangePickerName } from "../name";

const resources: IResourceCreator[] = [
  {
    icon: 'TimePickerSource',
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
  {
    icon: 'TimeRangePickerSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: TimeRangePickerName,
          'x-decorator': 'FormItem',
          'x-component': TimeRangePickerName,
        },
      },
    ],
  }
]

export default resources;