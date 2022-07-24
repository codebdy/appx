import { observer } from "@formily/reactive-react"
import React from "react"

export interface IPageHeaderExtraProps {
  children?: React.ReactNode
}

const PageHeaderExtra = observer((props: IPageHeaderExtraProps) => {
  return (
    <div className="rx-page-header-extra">
      {props.children}
    </div>
  )
})

export default PageHeaderExtra