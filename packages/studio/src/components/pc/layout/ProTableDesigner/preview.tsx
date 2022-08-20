import { observer } from "@formily/reactive-react"
import { Card } from "antd"
import React from "react"
import { IQueryFormProps } from "../ProTable/QueryForm"
import QueryTable from "../ProTable/QueryTable"
import QueryToolbar, { IQueryToolbarProps } from "../ProTable/QueryToolbar"
import SelectMessage from "../ProTable/SelectMessage"
import { DnFC, TreeNodeWidget } from '@designable/react'
import { QueryFormDesigner } from "./QueryFormDesigner"
import { IProTableProps } from "../ProTable"
import { createBehavior, createResource } from '@designable/core'
import { createFieldSchema } from "../../../common/Field/shared"
import { ProTableSchema } from "./schema"
import { ProTableLocales } from "./locales"
import clx from "classnames"
import { useFindNode } from "../../../common/hooks/useFindNode"
import _ from "lodash"
import { FormGridLocales } from "../../form/FormGridDesigner/locales"

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

  const queryForm = useFindNode('QueryForm');
  const toolbar = useFindNode("Toolbar");

  return (
    <div className={clx("appx-pro-table", className)} {...other}>
      {
        hasQueryForm && queryForm && <TreeNodeWidget node={queryForm} />
      }
      <Card style={{ marginTop: "16px" }}>
        {
          hasToolbar && toolbar && <TreeNodeWidget node={toolbar} />
        }
        <SelectMessage />
        <QueryTable />
      </Card>
    </div>
  )
})

ProTableDesigner.QueryForm = QueryFormDesigner
ProTableDesigner.QueryToolbar = QueryToolbar

ProTableDesigner.Behavior = createBehavior(
  {
    name: 'ProTable',
    extends: [],
    selector: (node) => node.props['x-component'] === 'ProTable',
    designerProps: {
      droppable: false,
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
    designerLocales: _.merge(ProTableLocales.QueryForm, FormGridLocales),
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
          hasQueryForm: true,
          hasToolbar: true,
        },
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'ProTable.QueryForm',
            'x-component-props': {
              collapsiable: true,
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
