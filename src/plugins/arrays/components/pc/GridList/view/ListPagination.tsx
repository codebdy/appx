import { Pagination } from "antd"
import React from "react"

export const ListPagination = (
  props: {
    total?: number,
  }
) => {
  const { total } = props;
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Pagination defaultCurrent={1} total={total} />
    </div>
  )
}