import React from 'react'
import { Input } from '@formily/antd'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createFieldSchema, FieldsType } from "../../common/Field";
import { SearchInputLocales } from './locales';
import { SearchInputSchema } from './schema';
import { SearchInput } from '../SearchInput';

export const SearchInputDesigner: DnFC<React.ComponentProps<typeof Input>> =
  SearchInput

SearchInputDesigner.Behavior = createBehavior(
  {
    name: 'SearchInput',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'SearchInput',
    designerProps: {
      propsSchema: createFieldSchema(SearchInputSchema, { fieldSourceType: FieldsType.Multiple }),
    },
    designerLocales: SearchInputLocales,
  },
)

SearchInputDesigner.Resource = createResource(
  {
    icon: 'InputSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: 'SearchInput',
          'x-decorator': 'FormItem',
          'x-component': 'SearchInput',
          'x-compoent-props': {
            isFuzzy: true,
          }
        },
      },
    ],
  },
)
