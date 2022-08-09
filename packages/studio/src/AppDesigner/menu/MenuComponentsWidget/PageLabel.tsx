import { IPage } from "../../../model"
import React from "react"
import { memo } from "react"

const PageLabel = memo((
  props: {
    page: IPage
  }
) => {
  const { page } = props;

  return (
    <div>
      {
        page.title
      }
    </div>
  )
})

export default PageLabel