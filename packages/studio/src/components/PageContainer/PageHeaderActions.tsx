import { observer } from "@formily/reactive-react"
import React from "react"

export interface IHeaderActionsProps {
  children?: React.ReactNode
}

const PageHeaderActions = observer((props: IHeaderActionsProps) => {
  return (
    <div className="rx-page-header-actions">
      {props.children}
    </div>
  )
})

export default PageHeaderActions