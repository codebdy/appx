import { observer } from "@formily/reactive-react"
import { PageHeader } from "antd"
import React from "react"
import "./style.less"

export interface IMediasProps {

}

export const Medias = observer((props: IMediasProps) => {
  return (
    <div>
      <PageHeader
        className="media-page-header"
        title="Title"
        subTitle="This is a subtitle"
      />
      哈哈
    </div>
  )
})