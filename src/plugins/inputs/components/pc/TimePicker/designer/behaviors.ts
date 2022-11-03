import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name, { TimeRangePickerName } from "../name";
import { TimePickerLocales, TimeRangePicker } from "./locales";
import { TimePickerSchema, TimeRangePickerSchema } from "./schema";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === Name,
    designerProps: {
      droppable: false,
    },
    designerLocales: TimePickerLocales,
    schema: TimePickerSchema,
  },
  {
    name: TimeRangePickerName,
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === TimeRangePickerName,
    designerProps: {
      droppable: false,
    },
    designerLocales: TimeRangePicker,
    schema: TimeRangePickerSchema,
  }
]

export default behaviors