import { Card } from "antd"
import React, { memo, useCallback, useState } from "react"
import { useResourceBundles } from "../../i18n/useResourceBundles"
import { IProTableParams, ProTableContext } from "./context"
import "./index.less"
import locales, { LOCALES_NS } from "./locales"
import { QueryFormExample } from "./QueryForm"
import QueryTable from "./QueryTable"
import QueryToolbar from "./QueryToolbar"
import SelectMessage from "./SelectMessage"

const ProTable = memo(() => {
  const [params, setParams] = useState<IProTableParams>();
  useResourceBundles(LOCALES_NS, locales, ()=>{
    setParams(params => ({ ...params, localesAdded: true }))
  });

  return (
    <ProTableContext.Provider value={params}>
      <div className="appx-pro-table">
        <Card>
          <QueryFormExample />
        </Card>
        <Card style={{ marginTop: "16px" }}>
          <QueryToolbar />
          <SelectMessage />
          <QueryTable />
        </Card>
      </div>
    </ProTableContext.Provider>
  )
})

export default ProTable