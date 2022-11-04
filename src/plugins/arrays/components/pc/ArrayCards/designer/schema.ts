import { FieldsType } from "@rxdrag/appx-plugin-sdk";
import { CardSchema } from "~/plugins/layouts/components/pc/Card/designer/schema";

export const ArrayCardsSchema = {
  display: {
    fieldSourceType: FieldsType.Single,
  },
  ...CardSchema
}

