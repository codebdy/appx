import { ISchema } from '@formily/react'
import { CSSStyle } from '../common'
import { FormLayoutSchema } from '../FormLayoutDesigner/schema'

export const FormSchema: ISchema = {
  type: 'object',
  properties: {
    ...(FormLayoutSchema.properties as any),
    style: CSSStyle,
  },
}
