import { observer } from "@formily/reactive-react"
import React from "react"

export interface IPageHeaderContentProps {
  children?: React.ReactNode
}

const PageHeaderContent = observer((props: IPageHeaderContentProps) => {
  return (
    <div className="rx-page-header-content">
      {props.children}
    </div>
  )
})

export default PageHeaderContent