import { observer } from "@formily/reactive-react"
import React from "react"

export interface IPageTitleProps {
  children?: React.ReactNode
}

const PageTitle = observer((props: IPageTitleProps) => {
  return (
    <div {...props}>
      {props.children}
    </div>
  )
})

export default PageTitle