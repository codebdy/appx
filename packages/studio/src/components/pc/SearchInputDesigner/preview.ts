import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createFieldSchema, FieldsType } from "../../common/Field";
import { SearchInputLocales } from './locales';
import { SearchInputSchema } from './schema';
import { ISearchInput, SearchInput } from '../SearchInput';

export const SearchInputDesigner: DnFC<ISearchInput> =
  SearchInput

SearchInputDesigner.Behavior = createBehavior(
  {
    name: 'SearchInput',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'SearchInput',
    designerProps: {
      propsSchema: createFieldSchema(SearchInputSchema, { fieldSourceType: FieldsType.Multiple, actions: ["onEnter"] }),
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
          title: '',
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
