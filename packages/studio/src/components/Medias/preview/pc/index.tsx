import { CloudUploadOutlined, FilterOutlined, SortAscendingOutlined } from "@ant-design/icons"
import { observer } from "@formily/reactive-react"
import { Button, Input, PageHeader, Space } from "antd"
import React from "react"
import "./style.less"

export interface IMediasProps {

}

export const Medias = observer((props: IMediasProps) => {
  return (
    <div>
      <PageHeader
        className="media-page-header"
        title="媒体管理"
        subTitle = {<Input.Search />}
        extra={
          <Space>
            <Button type="text" shape="circle" icon={<FilterOutlined />} />
            <Button type="text" shape="circle" icon={<SortAscendingOutlined />} />
            <Button type="primary" shape="round" icon={<CloudUploadOutlined />}>上传</Button>
          </Space>
        }
      >
      </PageHeader>
      哈哈
    </div>
  )
})