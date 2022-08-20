import React, { useMemo, useState, useCallback } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider, observer } from '@formily/react'
import {
  Input,
  Select,
  DatePicker,
  FormItem,
  FormGrid,
  FormLayout,
} from '@formily/antd'
import { ButtonsGridColum } from './ButtonsGridColum'

export interface IQueryFormProps {
  maxRowsOnCollapsed?: number,
  maxColumns?: number,
  layout?: "horizontal" | "vertical",
  className?: string,
  children?: React.ReactNode
}

const QueryForm: React.FC = observer((props: IQueryFormProps) => {
  const { layout = "vertical", maxRowsOnCollapsed = 1, maxColumns } = props;
  const [expanded, setExpanded] = useState(false);
  
  const grid = useMemo(
    () =>
      FormGrid.createFormGrid({
        maxColumns: maxColumns,
        maxWidth: 240,
        maxRows: maxRowsOnCollapsed,
        shouldVisible: (node, grid) => {
          if (node.index === grid.childSize - 1) return true
          if (grid.maxRows === Infinity) return true
          return node.shadowRow < maxRowsOnCollapsed + 1 && node.index < maxColumns - 1
        },
      }),
    [maxColumns, maxRowsOnCollapsed]
  )

  const collapsiable = useMemo(() => {
    const realRows = grid.shadowRows
    const computeRows = grid.fullnessLastColumn
      ? grid.shadowRows - 1
      : grid.shadowRows

    if (realRows < maxRowsOnCollapsed + 1) return false
    if (computeRows > maxRowsOnCollapsed) return true
    return false
  }, [grid.fullnessLastColumn, grid.shadowRows, maxRowsOnCollapsed])


  const handleToggle = useCallback(() => {
    setExpanded(expanded => !expanded)
  }, [])

  return (
    <FormLayout {...props} layout={layout} feedbackLayout="terse">
      <FormGrid grid={grid}>
        {props.children}
        <FormGrid.GridColumn
          gridSpan={expanded ? -1 : 1}
          style={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: layout === "horizontal" ? "flex-start" : "center",
          }}
        >
          <ButtonsGridColum collapsiable={collapsiable} expanded={expanded} onToggle={handleToggle} />
        </FormGrid.GridColumn>
      </FormGrid>
    </FormLayout>
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