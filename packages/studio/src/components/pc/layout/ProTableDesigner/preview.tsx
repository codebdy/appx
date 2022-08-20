import { observer } from "@formily/reactive-react"
import { Card } from "antd"
import React from "react"
import { IQueryFormProps, QueryFormExample } from "../ProTable/QueryForm"
import QueryTable from "../ProTable/QueryTable"
import QueryToolbar, { IQueryToolbarProps } from "../ProTable/QueryToolbar"
import SelectMessage from "../ProTable/SelectMessage"
import { DnFC } from '@designable/react'
import QueryForm from "./QueryForm"
import { IProTableProps } from "../ProTable"
import { createBehavior, createResource } from '@designable/core'
import { createFieldSchema } from "../../../common/Field/shared"
import { ProTableSchema } from "./schema"
import { ProTableLocales } from "./locales"
import clx from "classnames"

export const ProTableDesigner: DnFC<IProTableProps> & {
  QueryForm?: React.FC<IQueryFormProps>,
  QueryToolbar?: React.FC<IQueryToolbarProps>,
} = observer((props: IProTableProps) => {
  const {
    hasQueryForm,
    hasToolbar,
    className,
    ...other
  } = props;
  return (
    <div className={clx("appx-pro-table", className)} {...other}>
      <Card style={{ marginBottom: "16px" }}>
        <QueryFormExample />
      </Card>
      <Card>
        <div />
        <SelectMessage />
        <QueryTable />
      </Card>
    </div>
  )
})

ProTableDesigner.QueryForm = QueryForm
ProTableDesigner.QueryToolbar = QueryToolbar

ProTableDesigner.Behavior = createBehavior(
  {
    name: 'ProTable',
    extends: [],
    selector: (node) => node.props['x-component'] === 'ProTable',
    designerProps: {
      droppable: true,
      propsSchema: createFieldSchema(ProTableSchema, { hasDataBindSource: true }),
    },
    designerLocales: ProTableLocales,
  },
  {
    name: 'ProTable.QueryForm',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ProTable.QueryForm',
    designerProps: {
      droppable: true,
      deletable: false,
      propsSchema: createFieldSchema(ProTableSchema.QueryForm),
    },
    designerLocales: ProTableLocales.QueryForm,
  },
  {
    name: 'ProTable.QueryToolbar',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ProTable.QueryToolbar',
    designerProps: {
      droppable: true,
      deletable: false,
      propsSchema: createFieldSchema(ProTableSchema.QueryToolbar),
    },
    designerLocales: ProTableLocales.QueryToolbar,
  },
)

ProTableDesigner.Resource = createResource({
  icon: 'CardSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'ProTable',
        'x-component-props': {
          title: "Page title",
          //subtitle: "ProTable subtitle",
          hasBreadcrumb: false,
          hasGobackButton: false,
          hasActions: false,
          hasHeaderContent: false,
          hasHeaderContentExtra: false,
          hasTabs: false,
          hasFooterToolbar: false,
        },
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'ProTable.QueryForm',
            'x-component-props': {
            },
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'ProTable.QueryToolbar',
            'x-component-props': {
            },
          },
        },
      ]
    },
  ],
})
