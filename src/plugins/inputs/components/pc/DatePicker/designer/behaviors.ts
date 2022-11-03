import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name, { DateRangePickerName } from "../name";
import { DatePickerLocales, DateRangePicker } from "./locales";
import { DatePickerSchema, DateRangePickerSchema } from "./schema";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === Name,
    designerProps: {
      droppable: false,
    },
    designerLocales: DatePickerLocales,
    schema: DatePickerSchema,
  },
  {
    name: DateRangePickerName,
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === DateRangePickerName,
    designerProps: {
      droppable: false,
    },
    designerLocales: DateRangePicker,
    schema: DateRangePickerSchema,
  }
]

export default behaviors