import { Pagination } from "antd"
import React, { useMemo } from "react"

export const ListPagination = (
  props: {
    total?: number,
    paginationPosition?: "bottomLeft" | "bottomCenter" | "bottomRight",
  }
) => {
  const { total, paginationPosition = "bottomCenter" } = props;
  const position = useMemo(() => {
    if (paginationPosition === "bottomLeft") {
      return "flex-start"
    } else if (paginationPosition === "bottomCenter") {
      return "center"
    } else if (paginationPosition === "bottomRight") {
      return "flex-end"
    }
  }, [paginationPosition])
  return (
    <div style={{ display: "flex", justifyContent: position }}>
      <Pagination defaultCurrent={1} total={total} />
    </div>
  )
}