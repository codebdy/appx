import React, { memo } from "react"

const QueryToolbar = memo(()=>{
  return (
    <div style={{
      display:"flex",
      alignItems:"center",
      justifyContent:"space-between"
    }}>
      <div>
        查询表格
      </div>
      <div
        style={{
          display:"flex",
          alignItems:"center",
        }}
      >
        ddd
      </div>
    </div>
  )
})

export default QueryToolbar