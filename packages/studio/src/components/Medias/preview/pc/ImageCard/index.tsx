import { observer } from "@formily/reactive-react"
import { Card } from "antd"
import React from "react"

export const ImageCard = observer(() => {
  return (
    <Card
      style={{ width: "100%", borderRadius: 8}}
      hoverable
      size="small"
      cover={
        <img
          alt="example"
          style={{ borderRadius: "8px 8px 0 0" }}
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
    >
      <div>向日葵</div>
    </Card>
  )
})