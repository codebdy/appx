import React, { useCallback } from 'react'
import { Table, TableProps } from 'antd'
import { TreeNode } from '@designable/core'
import {
  useTreeNode,
  TreeNodeWidget,
  DroppableWidget,
  useNodeIdProps,
  DnFC,
} from '@designable/react'
import { ArrayBase } from '@formily/antd'
import { observer } from '@formily/react'
import cls from 'classnames'
import {
  queryNodesByComponentPath,
  hasNodeByComponentPath,
  createEnsureTypeItemsNode,
} from '@rxdrag/plugin-sdk/funcs'
import { LoadTemplate } from '@designable/formily-antd/lib/common/LoadTemplate'
import { useParseLangMessage } from '@rxdrag/plugin-sdk/hooks/useParseLangMessage'
import { useSelectable } from '@rxdrag/plugin-sdk/contexts/propTable'

const ensureObjectItemsNode = createEnsureTypeItemsNode('object')

const HeaderCell: React.FC = (props: any) => {
  return (
    <th
      {...props}
      data-designer-node-id={props.className.match(/data-id:([^\s]+)/)?.[1]}
    >
      {props.children}
    </th>
  )
}

const BodyCell: React.FC = (props: any) => {
  return (
    <td
      {...props}
      data-designer-node-id={props.className.match(/data-id:([^\s]+)/)?.[1]}
    >
      {props.children}
    </td>
  )
}

export const TableDesigner: DnFC<TableProps<any>> = observer((props) => {
  const { ...others } = props;
  const node = useTreeNode();
  const nodeId = useNodeIdProps();
  const p = useParseLangMessage();
  const selectable = useSelectable();
  const itemsNode = node.children.find((child) => child.props['type'] === "object");

  const findOperationNode = useCallback(() => {
    return queryNodesByComponentPath(node, [
      'ProTable.Table',
      '*',
      'ProTable.Column',
    ])?.find(node => node?.props?.["x-actions"])
  }, [node]);

  const defaultRowKey = useCallback(() => {
    return node.id
  }, [node.id])

  const renderColumn = useCallback((node: TreeNode) => {
    const { sortable, ...props } = node.props?.['x-component-props'] || {}
    const children = node.children;
    return (
      <Table.Column
        {...props}
        sorter={sortable ? {} : undefined}
        title={
          <div>
            {p(props?.title)}
          </div>
        }
        dataIndex={node.id}
        className={`data-id:${node.id}`}
        render={(value, record, key) => {
          return (
            <ArrayBase.Item key={key} index={key} record={null}>
              {(children as any)?.length
                ?
                children?.map(child => {
                  return <TreeNodeWidget node={child} />
                })
                : 'Droppable'
              }
            </ArrayBase.Item>
          )
        }}
      />
    )
  }, [p]);

  const renderColumnGroup = useCallback((node: TreeNode) => {
    const props = node.props?.['x-component-props'] || {}
    const children = node.children;
    return (<Table.ColumnGroup
      {...props}
      title={
        <div>
          {p(props?.title)}
        </div>
      }
      dataIndex={node.id}
      className={`data-id:${node.id}`}
    >
      {
        children?.map(child => {
          const isGroup = child.props?.['x-component'] === "ProTable.ColumnGroup";
          if (isGroup) {
            return renderColumnGroup(child)
          } else {
            return renderColumn(child)
          }
        })
      }
    </Table.ColumnGroup>
    )
  }, [p, renderColumn]);

  const renderChild = useCallback((node: TreeNode) => {
    const isGroup = node.props?.['x-component'] === "ProTable.ColumnGroup";
    if (isGroup) {
      return renderColumnGroup(node)
    } else {
      return renderColumn(node)
    }
  }, [renderColumn, renderColumnGroup])

  return (
    <div {...nodeId} className="dn-array-table">
      {
        node.children.length === 0
          ?
          <DroppableWidget />
          :
          <ArrayBase disabled>
            <Table
              size="small"
              bordered
              {...others}
              scroll={{ x: '100%' }}
              className={cls('ant-formily-array-table', props.className)}
              style={{ marginBottom: 10, ...props.style }}
              rowKey={defaultRowKey}
              dataSource={[{ id: '1' }]}
              pagination={false}
              components={{
                header: {
                  cell: HeaderCell,
                },
                body: {
                  cell: BodyCell,
                },
              }}
              rowSelection={selectable && {}}
            >
              {itemsNode?.children?.map((node) => {
                return renderChild(node);
              })}
            </Table>
          </ArrayBase>
      }
      <LoadTemplate
        actions={[
          {
            title: node.getMessage('addIndex'),
            icon: 'AddIndex',
            onClick: () => {
              if (
                hasNodeByComponentPath(node, [
                  'ProTable.Table',
                  '*',
                  'ProTable.Column',
                  'ProTable.Index',
                ])
              ) {
                return
              }

              const tableColumn = new TreeNode({
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'ProTable.Column',
                  'x-component-props': {
                    title: `No.`,
                  },
                },
                children: [
                  {
                    componentName: 'Field',
                    props: {
                      type: 'void',
                      'x-component': 'ProTable.Index',
                    },
                  },
                ],
              })
              ensureObjectItemsNode(node).prepend(tableColumn)
            },
          },
          {
            title: node.getMessage('addColumnGroup'),
            icon: 'AddColumnGroup',
            onClick: () => {
              const operationNode = findOperationNode();

              const tableColumnGroup = new TreeNode({
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'ProTable.ColumnGroup',
                  'x-component-props': {
                    title: `Column group`,
                  },
                },
              })
              if (operationNode) {
                operationNode.insertBefore(tableColumnGroup)
              } else {
                ensureObjectItemsNode(node).append(tableColumnGroup)
              }
            },
          },
          {
            title: node.getMessage('addColumn'),
            icon: 'AddColumn',
            onClick: () => {
              const operationNode = findOperationNode()
              const tableColumn = new TreeNode({
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'ProTable.Column',
                  'x-component-props': {
                    title: `Title`,
                  },
                },
              })
              if (operationNode) {
                operationNode.insertBefore(tableColumn)
              } else {
                ensureObjectItemsNode(node).append(tableColumn)
              }
            },
          },
          {
            title: node.getMessage('addOperation'),
            icon: 'AddOperation',
            onClick: () => {
              const oldOperationNode = findOperationNode();

              if (!oldOperationNode) {
                const operationNode = new TreeNode({
                  componentName: 'Field',
                  props: {
                    type: 'void',
                    'x-component': 'ProTable.Column',
                    'x-component-props': {
                      title: `Actions`,
                    },
                    "x-actions": true,
                  },
                  children: [
                    {
                      componentName: 'Field',
                      props: {
                        type: 'void',
                        'x-component': 'Button',
                        "x-component-props": {
                          shape: "circle",
                          type: "text",
                          icon: {
                            iconKey: "EditOutlined"
                          }
                        }
                      },
                    },
                    {
                      componentName: 'Field',
                      props: {
                        type: 'void',
                        'x-component': 'Button',
                        "x-component-props": {
                          shape: "circle",
                          type: "text",
                          icon: {
                            iconKey: "DeleteOutlined"
                          }
                        }
                      },
                    },
                  ],
                })
                ensureObjectItemsNode(node).append(operationNode)
              }
            },
          },
        ]}
      />
    </div>
  )
})
