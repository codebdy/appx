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
  findNodeByComponentPath,
  hasNodeByComponentPath,
} from '../../../../common/shared'
import { useDropTemplate } from "@designable/formily-antd/lib/hooks/useDropTemplate"
import { LoadTemplate } from '@designable/formily-antd/lib/common/LoadTemplate'


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
  const node = useTreeNode()
  const nodeId = useNodeIdProps()
  useDropTemplate('ProTable', (source) => {
    const indexNode = new TreeNode({
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
    const columnNode = new TreeNode({
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'ProTable.Column',
        'x-component-props': {
          title: `Title`,
        },
      },
      children: source.map((node) => {
        node.props.title = undefined
        return node
      }),
    })

    const operationNode = new TreeNode({
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'ProTable.Column',
        'x-component-props': {
          title: `Title`,
        },
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'ProTable.Remove',
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'ProTable.MoveDown',
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'ProTable.MoveUp',
          },
        },
      ],
    })
    const objectNode = new TreeNode({
      componentName: 'Field',
      props: {
        type: 'object',
      },
      children: [indexNode, columnNode, operationNode],
    })
    return [objectNode]
  })

  const findOperationNode = useCallback(() => {
    return findNodeByComponentPath(node, [
      'ProTable.Table',
      '*',
      'ProTable.Column',
      (name) => {
        return (
          name === 'ProTable.Remove' ||
          name === 'ProTable.MoveDown' ||
          name === 'ProTable.MoveUp'
        )
      },
    ])
  }, [node]);

  const defaultRowKey = useCallback(() => {
    return node.id
  }, [node.id])

  const renderColumn = useCallback((node: TreeNode) => {
    const props = node.props?.['x-component-props'] || {}
    const children = node.children;
    return (
      <Table.Column
        {...props}
        title={
          <div>
            {props?.title}
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
  }, []);

  const renderColumnGroup = useCallback((node: TreeNode) => {
    const props = node.props?.['x-component-props'] || {}
    const children = node.children;
    return (<Table.ColumnGroup
      {...props}
      title={
        <div>
          {props?.title}
        </div>
      }
      dataIndex={node.id}
      className={`data-id:${node.id}`}
      render={(value, record, key) => {
        return (
          'Droppable'
        )
      }}
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
  }, [renderColumn]);

  const renderChild = useCallback((node: TreeNode) => {
    const isGroup = node.props?.['x-component'] === "ProTable.ColumnGroup";
    if (isGroup) {
      return renderColumnGroup(node)
    } else {
      return renderColumn(node)
    }
  }, [renderColumn, renderColumnGroup])

  useDropTemplate('ProTable.Column', (source) => {
    return source.map((node) => {
      node.props.title = undefined
      return node
    })
  })

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
              {...props}
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
            >
              {node.children?.map((node) => {
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
              )
                return
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
              node.prepend(tableColumn)
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
                    title: `Group title`,
                  },
                },
              })
              if (operationNode) {
                operationNode.parent.insertBefore(tableColumnGroup)
              } else {
                node.append(tableColumnGroup)
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
                operationNode.parent.insertBefore(tableColumn)
              } else {
                node.append(tableColumn)
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
                      title: `Title`,
                    },
                  },
                  children: [
                    {
                      componentName: 'Field',
                      props: {
                        type: 'void',
                        'x-component': 'ProTable.Remove',
                      },
                    },
                    {
                      componentName: 'Field',
                      props: {
                        type: 'void',
                        'x-component': 'ProTable.MoveDown',
                      },
                    },
                    {
                      componentName: 'Field',
                      props: {
                        type: 'void',
                        'x-component': 'ProTable.MoveUp',
                      },
                    },
                  ],
                })
                node.append(operationNode)
              }
            },
          },
        ]}
      />
    </div>
  )
})
