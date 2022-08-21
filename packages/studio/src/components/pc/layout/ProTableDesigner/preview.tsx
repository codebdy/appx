import { observer } from "@formily/reactive-react"
import { Card, TableProps } from "antd"
import React from "react"
import { IQueryFormProps } from "../ProTable/QueryForm"
import { ITableToolbarProps } from "../ProTable/TableToolbar"
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
import { TableToolbarDesigner } from "./TableToolbarDesigner"
import { TableBatchActionsDesigner } from "./TableBatchActionsDesigner"
import { ITableBatchActionsProps } from "../ProTable/TableBatchActions"
import { DataTableColumnGroupLocales, DataTableColumnLocales, DataTableLocales } from "./TableDesigner/locales"
import { DataTableSchema } from "./TableDesigner/schema"
import { TableDesigner } from "./TableDesigner"

export const ProTableDesigner: DnFC<IProTableProps> & {
  QueryForm?: React.FC<IQueryFormProps>,
  TableToolbar?: React.FC<ITableToolbarProps>,
  TableBatchActions?: React.FC<ITableBatchActionsProps>,
  Table?: React.FC<TableProps<any>>,
  //ColumnGroup?: React.FC<ColumnGroupProps<any>>,
  //Column?: React.FC<ColumnProps<any>>,
} = observer((props: IProTableProps) => {
  const {
    hasQueryForm = true,
    hasToolbar = true,
    hasBatchActions = true,
    className,
    ...other
  } = props;

  const queryForm = useFindNode('QueryForm');
  const toolbar = useFindNode("TableToolbar");
  const batchActions = useFindNode("TableBatchActions");
  const dataTable = useFindNode("Table");

  return (
    <div className={clx("appx-pro-table", className)} {...other}>
      {
        hasQueryForm && queryForm && <TreeNodeWidget node={queryForm} />
      }
      <Card style={{ marginTop: "16px" }}>
        {
          hasToolbar && toolbar && <TreeNodeWidget node={toolbar} />
        }
        {
          hasBatchActions && batchActions && <TreeNodeWidget node={batchActions} />
        }

        <TreeNodeWidget node={dataTable} />
      </Card>
    </div>
  )
})

ProTableDesigner.QueryForm = QueryFormDesigner;
ProTableDesigner.TableToolbar = TableToolbarDesigner;
ProTableDesigner.TableBatchActions = TableBatchActionsDesigner;
ProTableDesigner.Table = TableDesigner;
//ProTableDesigner.ColumnGroup = ColumnGroupDesigner;
//ProTableDesigner.Column = ColumnDesigner;

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
      cloneable: false,
      draggable: false,
      propsSchema: createFieldSchema(ProTableSchema.QueryForm),
    },
    designerLocales: _.merge(JSON.parse(JSON.stringify(FormGridLocales)), ProTableLocales.QueryForm),
  },
  {
    name: 'ProTable.TableToolbar',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ProTable.TableToolbar',
    designerProps: {
      droppable: true,
      deletable: false,
      cloneable: false,
      draggable: false,
      propsSchema: createFieldSchema(ProTableSchema.TableToolbar),
    },
    designerLocales: ProTableLocales.TableToolbar,
  },
  {
    name: 'ProTable.TableBatchActions',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ProTable.TableBatchActions',
    designerProps: {
      droppable: true,
      deletable: false,
      cloneable: false,
      draggable: false,
      propsSchema: createFieldSchema(ProTableSchema.TableBatchActions),
    },
    designerLocales: ProTableLocales.TableBatchActions,
  },
  {
    name: 'ProTable.Table',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ProTable.Table',
    designerProps: {
      droppable: true,
      deletable: false,
      cloneable: false,
      draggable: false,
      propsSchema: createFieldSchema(DataTableSchema),
    },
    designerLocales: DataTableLocales,
  },
  {
    name: 'ProTable.Column',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ProTable.Column',
    designerProps: {
      droppable: true,
      allowDrop: (node) =>
        node.props['type'] === 'object' &&
        node.parent?.props?.['x-component'] === 'ProTable.Column',
      propsSchema: createFieldSchema(DataTableSchema.Column),
    },
    designerLocales: DataTableColumnLocales,
  },
  {
    name: 'ProTable.ColumnGroup',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ProTable.ColumnGroup',
    designerProps: {
      droppable: true,
      allowDrop: (node) =>
        node.props['type'] === 'object' &&
        node.parent?.props?.['x-component'] === 'ProTable.Column',
      propsSchema: createFieldSchema(DataTableSchema.ColumnGroup),
    },
    designerLocales: DataTableColumnGroupLocales,
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
          hasBatchActions: true,
        },
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'object',
            'x-component': 'ProTable.QueryForm',
            'x-component-props': {
              collapsiable: true,
              colon: true,
            },
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'ProTable.TableToolbar',
            'x-component-props': {
            },
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'ProTable.TableBatchActions',
            'x-component-props': {
            },
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'array',
            'x-component': 'ProTable.Table',
            'x-component-props': {
            },
          }
        },
      ]
    },
  ],
})
