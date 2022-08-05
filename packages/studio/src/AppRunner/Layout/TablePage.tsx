import React from "react";
import { PageContainer } from '@ant-design/pro-components';
import ProTable from "../../components/ProTable";
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { FormItem } from "@formily/antd";

const SchemaField = createSchemaField({
  components: {
    ProTable,
    FormItem
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
          </SchemaField.Array>
        </SchemaField>
      </FormProvider>
    </PageContainer>
  )
}

export default TablePage