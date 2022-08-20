import React, { useMemo, useState, useCallback, CSSProperties } from 'react'
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
import { Card } from 'antd'

export interface IQueryFormProps {
  maxRowsOnCollapsed?: number,
  maxColumns?: number,
  maxWidth?: number,
  layout?: "horizontal" | "vertical",
  collapsiable?: boolean,
  className?: string,
  children?: React.ReactNode,
  style?: CSSProperties,
}

const QueryForm: React.FC = observer((props: IQueryFormProps) => {
  const {
    layout = "horizontal",
    maxRowsOnCollapsed = 1,
    maxColumns = 3,
    maxWidth = 240,
    collapsiable = true,
    children,
    style,
    ...other
  } = props;
  const [expanded, setExpanded] = useState(false);


  const grid = useMemo(
    () => {
      console.log("哈哈哈", maxColumns)
      return FormGrid.createFormGrid({
        maxColumns: maxColumns,
        maxWidth: maxWidth,
        maxRows: maxRowsOnCollapsed,
        shouldVisible: (node, grid) => {
          return true;
          // if (node.index === grid.childSize - 1) return true
          // if (grid.maxRows === Infinity) return true
          // return node.shadowRow < maxRowsOnCollapsed + 1 && node.index < maxColumns - 1
        },
      })    
    },
    [maxColumns, maxRowsOnCollapsed, maxWidth]
  )

  const handleToggle = useCallback(() => {
    setExpanded(expanded => !expanded)
  }, [])

  return (
    <Card {...other} style={{ ...style || {}, marginTop: "16px" }}>
      <FormLayout layout={layout} feedbackLayout="terse">
        <FormGrid grid={grid}>
          {children}
          {
            !collapsiable && <ButtonsGridColum collapsiable={collapsiable} expanded={expanded} onToggle={handleToggle} />
          }
        </FormGrid>
        {
          collapsiable && <ButtonsGridColum collapsiable={collapsiable} expanded={expanded} onToggle={handleToggle} />
        }
      </FormLayout>
    </Card>
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

        </SchemaField.Object>
      </SchemaField>
    </FormProvider>
  )
}

export default QueryForm
export { QueryFormExample }