import { observer } from "@formily/reactive-react"
import { Card, PageHeader } from "antd"
import React from "react"
import "./style.less"

export interface IMediasProps {

}

export const Medias = observer((props: IMediasProps) => {
  return (
    <div>
      <Card>
        <PageHeader
          title="Title"
          subTitle="This is a subtitle"
        />
      </Card>
      哈哈
    </div>
  )
})