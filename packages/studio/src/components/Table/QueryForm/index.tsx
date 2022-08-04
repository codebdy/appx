import React, { useMemo, Fragment } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider, observer } from '@formily/react'
import {
  Form,
  Input,
  Select,
  DatePicker,
  FormItem,
  FormGrid,
  Submit,
  Reset,
  FormButtonGroup,
  FormLayout,
} from '@formily/antd'
import { Button } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

const useCollapseGrid = (maxRows: number, maxColumns = 4) => {
  const grid = useMemo(
    () =>
      FormGrid.createFormGrid({
        maxColumns: maxColumns,
        maxWidth: 240,
        maxRows: maxRows,
        shouldVisible: (node, grid) => {
          if (node.index === grid.childSize - 1) return true
          if (grid.maxRows === Infinity) return true
          return node.shadowRow < maxRows + 1 && node.index < maxColumns - 1
        },
      }),
    [maxColumns, maxRows]
  )
  const expanded = grid.maxRows === Infinity
  const realRows = grid.shadowRows
  const computeRows = grid.fullnessLastColumn
    ? grid.shadowRows - 1
    : grid.shadowRows

  const toggle = () => {
    if (grid.maxRows === Infinity) {
      grid.maxRows = maxRows
    } else {
      grid.maxRows = Infinity
    }
  }
  const takeType = () => {
    if (realRows < maxRows + 1) return 'incomplete-wrap'
    if (computeRows > maxRows) return 'collapsible'
    return 'complete-wrap'
  }
  return {
    grid,
    expanded,
    toggle,
    type: takeType(),
  }
}

const QueryForm: React.FC = observer((props) => {
  const { grid, expanded, toggle, type } = useCollapseGrid(1)

  const renderActions = () => {
    return (
      <Fragment>
        <Submit onSubmit={console.log}>查询</Submit>
        <Reset >重置</Reset>
      </Fragment>
    )
  }

  const renderButtonGroup = () => {
    if (type === 'incomplete-wrap') {
      return (
        <FormButtonGroup.FormItem>
          <FormButtonGroup>{renderActions()}</FormButtonGroup>
        </FormButtonGroup.FormItem>
      )
    }
    if (type === 'collapsible') {
      return (
        <>
          <FormButtonGroup align="right">{renderActions()}</FormButtonGroup>
          <FormButtonGroup>
            <Button 
              type="link"
              onClick={(e) => {
                e.preventDefault()
                toggle()
              }}
            >
              {expanded ? '收起' : '展开'}
              {expanded ? <UpOutlined /> : <DownOutlined />}
            </Button>
          </FormButtonGroup>
        </>
      )
    }
    return (
      <FormButtonGroup align="right" style={{ display: 'flex' }}>
        {renderActions()}
      </FormButtonGroup>
    )
  }

  return (
    <Form {...props} layout="horizontal" feedbackLayout="terse">
      <FormGrid grid={grid}>

        {props.children}
        <FormGrid.GridColumn
          gridSpan={expanded ? -1 : 1}
          style={{ display: 'flex', justifyContent: 'right', alignItems:"flex-start" }}
        >
          {renderButtonGroup()}
        </FormGrid.GridColumn>

      </FormGrid>
    </Form>
  )
})

const SchemaField = createSchemaField({
  components: {
    QueryForm,
    Input,
    Select,
    DatePicker,
    FormItem,
  },
})

const QueryFormExample = () => {
  const form = useMemo(() => createForm(), [])
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Object x-component="QueryForm">
          <SchemaField.String
            name="input1"
            title="Input 1"
            x-component="Input"
            x-decorator="FormItem"
          />
          <SchemaField.String
            name="input2"
            title="Input 2"
            x-component="Input"
            x-decorator="FormItem"
          />

          <SchemaField.String
            name="select1"
            title="Select 1"
            x-component="Select"
            x-decorator="FormItem"
          />
          <SchemaField.String
            name="select2"
            title="Select 2"
            x-component="Select"
            x-decorator="FormItem"
          />
          <SchemaField.String
            name="date"
            title="DatePicker"
            x-component="DatePicker"
            x-decorator="FormItem"
          />
          <SchemaField.String
            name="dateRange"
            title="DatePicker.RangePicker"
            x-component="DatePicker.RangePicker"
            x-decorator="FormItem"
            x-decorator-props={{
              gridSpan: 2,
            }}
          />
          <SchemaField.String
            name="select3"
            title="Select 3"
            x-component="Select"
            x-decorator="FormItem"
          />
        </SchemaField.Object>
      </SchemaField>
    </FormProvider>
  )
}

export default QueryForm
export { QueryFormExample }