import { observer } from "@formily/reactive-react"
import React from "react"

export interface IPageHeaderContentExtraProps {
  children?: React.ReactNode
}

const HeaderContentExtra = observer((props: IPageHeaderContentExtraProps) => {
  return (
    <div className="rx-page-header-content-extra">
      {props.children}
    </div>
  )
})

export default HeaderContentExtra