import { observer } from "@formily/reactive-react"
import React from "react"

export interface IPageContentProps {
  children?: React.ReactNode
}

const PageContent = observer((props: IPageContentProps) => {
  return (
    <div className="rx-page-content">
      {props.children}
    </div>
  )
})

export default PageContent