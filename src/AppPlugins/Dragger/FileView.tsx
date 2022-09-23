import React from "react"
import { memo } from "react"
import cls from "classnames";
import { DeleteOutlined, PaperClipOutlined } from "@ant-design/icons";
import { Button } from "antd";

export enum FileStatus {
  waiting = 1,
  uploading,
  finished,
  error
}
export interface IFileTask {
  file: File,
  uploadedUrl?: string,
}

export const FileView = memo((
  props: {
    task: IFileTask,
    onRemove?: (fileTask: IFileTask) => void
  }
) => {
  const { task, onRemove } = props;

  return (
    <div className={cls("upload-file-item")} title="xxxx">
      <div className="item-text">
        <PaperClipOutlined style={{ marginRight: 4 }} />
        {task.file.name}
      </div>

      <div className="upload-file-action">
        <Button type="text" size="small" icon={<DeleteOutlined />}></Button>
      </div>
    </div>
  )
})