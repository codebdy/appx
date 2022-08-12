import React from "react";
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { ArrayTable, FormItem } from "@formily/antd";
import ProTable from "../../components/ProTable";
import PageContainer from "../../components/PageContainer";

const SchemaField = createSchemaField({
  components: {
    ProTable,
    FormItem,
    ArrayTable
  },
})

const form = createForm()

const TablePage = () => {
  return (
    <PageContainer>
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Array
            name="array"
            x-decorator="FormItem"
            x-component="ProTable"
            x-component-props={{
              pagination: { pageSize: 10 },
              scroll: { x: '100%' },
            }}
          >
            <SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ width: 50, title: 'Sort', align: 'center' }}
              >
                <SchemaField.Void
                  x-decorator="FormItem"
                  required
                  x-component="ArrayTable.SortHandle"
                />
              </SchemaField.Void>
            </SchemaField.Object>
          </SchemaField.Array>
        </SchemaField>
      </FormProvider>
    </PageContainer>
  )
}

export default TablePage