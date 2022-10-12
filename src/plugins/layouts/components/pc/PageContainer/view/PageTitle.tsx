import { observer } from "@formily/reactive-react"
import React from "react"

export interface IPageTitleProps {
  children?: React.ReactNode
}

const PageTitle = observer((props: IPageTitleProps) => {
  return (
    <div className="rx-page-header-title" {...props}>
      {props.children}
    </div>
  )
})

export default PageTitle