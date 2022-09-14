import { CloudUploadOutlined, FilterOutlined, SortAscendingOutlined } from "@ant-design/icons"
import { observer } from "@formily/reactive-react"
import { Button, Input, PageHeader, Space } from "antd"
import { ResizableColumn } from "../../../../common/ResizableColumn"
import React from "react"
import "./style.less"
import { FolderTree } from "./FolderTree"

export interface IMediasProps {

}

export const Medias = observer((props: IMediasProps) => {
  return (
    <div className="rx-medias">
      <PageHeader
        className="media-page-header"
        title="媒体管理"
        subTitle={<Input.Search />}
        extra={
          <Space>
            <Button type="text" shape="circle" icon={<FilterOutlined />} />
            <Button type="text" shape="circle" icon={<SortAscendingOutlined />} />
            <Button type="primary" shape="round" icon={<CloudUploadOutlined />}>上传</Button>
          </Space>
        }
      >
      </PageHeader>
      <div className="medias-body">
        <ResizableColumn maxWidth={460} minWidth={160}>
          <div className="medias-left-tree right-border">
            <FolderTree />
          </div>
        </ResizableColumn>
        <div >
          哈哈哈
        </div>
      </div>
    </div>
  )
})