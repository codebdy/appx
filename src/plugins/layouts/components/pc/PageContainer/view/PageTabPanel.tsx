import { observer } from "@formily/reactive-react"
import React from "react"

export interface IPageTabPanelProps {
  title?: string,
  children?: React.ReactNode
}

const PageTabPanel = observer((props: IPageTabPanelProps) => {
  return (
    <div className="rx-page-tab-pannel">
      {props.children}
    </div>
  )
})

export default PageTabPanel