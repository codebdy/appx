import { ISchema } from '@formily/react'
import { CSSStyle } from '../common'

export const FormSchema: ISchema = {
  type: 'object',
  properties: {
    style: CSSStyle,
  },
}
