import { IResourceCreator } from "@designable/core";
import Name, { DateRangePickerName } from "../name";

const resources: IResourceCreator[] = [
  {
    icon: 'DatePickerSource',
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
    icon: 'DateRangePickerSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: DateRangePickerName,
          'x-decorator': 'FormItem',
          'x-component': DateRangePickerName,
        },
      },
    ],
  }
]

export default resources;