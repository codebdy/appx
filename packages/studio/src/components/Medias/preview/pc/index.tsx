import { CloudUploadOutlined, FilterOutlined, HomeOutlined, SortAscendingOutlined } from "@ant-design/icons"
import { observer } from "@formily/reactive-react"
import { Breadcrumb, Button, Input, Space } from "antd"
import { ResizableColumn } from "../../../../common/ResizableColumn"
import React from "react"
import "./style.less"
import { FolderTree } from "./FolderTree"

export interface IMediasProps {

}

export const Medias = observer((props: IMediasProps) => {
  return (
    <div className="rx-medias top-border">
      <div className="media-page-header">
        <div className="ant-page-header-heading-title">媒体管理</div>

        <div className="medias-actions">
          <div className="search-wrap">
            <Input.Search />
          </div>
          <Space>
            <Button type="text" shape="circle" icon={<FilterOutlined />} />
            <Button type="text" shape="circle" icon={<SortAscendingOutlined />} />
            <Button type="primary" shape="round" icon={<CloudUploadOutlined />}>上传</Button>
          </Space>
        </div>
      </div>
      <div className="medias-body">
        <ResizableColumn maxWidth={460} minWidth={160}>
          <div className="medias-left-tree right-border top-border">
            <div className="tree-title bottom-border">
              <h3>分类</h3>
            </div>
            <div className="tree-body">
              <FolderTree />
            </div>
          </div>
        </ResizableColumn>
        <div className="medias-content-wrap">
          <div className="medias-toolbar">
            <Breadcrumb>
              <Breadcrumb.Item href="">
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="">
                <span>Application List</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Application</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="medias-content">
            哈哈哈
          </div>

        </div>
      </div>
    </div>
  )
})