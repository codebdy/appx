import { observer } from "@formily/reactive-react"
import { Card, TableProps } from "antd"
import React from "react"
import { DnFC, TreeNodeWidget } from '@designable/react'
import clx from "classnames"
import _ from "lodash"
import { QueryFormDesigner } from "./QueryFormDesigner"
import { TableToolbarDesigner } from "./TableToolbarDesigner"
import { TableBatchActionsDesigner } from "./TableBatchActionsDesigner"
import { TableDesigner } from "./TableDesigner"
import { IndexDesigner } from "./TableDesigner/IndexDesigner"
import { TableToolbarActionsDesigner } from "./TableToolbarActionsDesigner"
import { IProTableProps } from "../view"
import { IQueryFormProps } from "../view/QueryForm"
import { ITableToolbarProps } from "../view/TableToolbar"
import { ITableToolbarActionsProps } from "../view/TableToolbarActions"
import { ITableBatchActionsProps } from "../view/TableBatchActions"
import { useFindNode } from "../../../../../../plugin-sdk"
import { ProTableContext } from "../../../../../../plugin-sdk/contexts/propTable"

const ComponentDesigner: DnFC<IProTableProps> & {
  QueryForm?: React.FC<IQueryFormProps>,
  Toolbar?: React.FC<ITableToolbarProps>,
  ToolbarActions?: React.FC<ITableToolbarActionsProps>,
  BatchActions?: React.FC<ITableBatchActionsProps>,
  Table?: React.FC<TableProps<any>>,
  Index?: React.FC,
} = observer((props: IProTableProps) => {
  const {
    hasQueryForm = true,
    hasToolbar = true,
    selectable = true,
    className,
    dataBind: dataSource,
    ...other
  } = props;

  const queryForm = useFindNode('QueryForm');
  const toolbar = useFindNode("Toolbar");
  const batchActions = useFindNode("BatchActions");
  const dataTable = useFindNode("Table");

  return (
    <ProTableContext.Provider value={{ selectable }}>
      <div className={clx("appx-pro-table", className)} {...other}>
        {
          hasQueryForm && queryForm && <TreeNodeWidget node={queryForm} />
        }
        <Card style={{ marginTop: "16px" }}>
          {
            hasToolbar && toolbar && <TreeNodeWidget node={toolbar} />
          }
          {
            selectable && batchActions && <TreeNodeWidget node={batchActions} />
          }

          <TreeNodeWidget node={dataTable} />
        </Card>
      </div>
    </ProTableContext.Provider>
  )
})

ComponentDesigner.QueryForm = QueryFormDesigner;
ComponentDesigner.Toolbar = TableToolbarDesigner;
ComponentDesigner.ToolbarActions = TableToolbarActionsDesigner;
ComponentDesigner.BatchActions = TableBatchActionsDesigner;
ComponentDesigner.Table = TableDesigner;
ComponentDesigner.Index = IndexDesigner;
//ProTableDesigner.Column = ColumnDesigner;

export default ComponentDesigner;
