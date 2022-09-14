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
    <div className="rx-medias top-border">
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
          <div className="medias-left-tree right-border top-border">
            <div className="tree-title bottom-border">
              <h3>目录</h3>
            </div>
            <div className="tree-body">
              <FolderTree />
            </div>
          </div>
        </ResizableColumn>
        <div className="medias-content-wrap">
          <div className="medias-toolbar">
            ddd
          </div>
          <div className="medias-content">
            哈哈哈
          </div>

        </div>
      </div>
    </div>
  )
})