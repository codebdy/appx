import React, { useCallback } from "react"
import { memo } from "react"
import cls from "classnames";
import { DeleteOutlined, LoadingOutlined, PaperClipOutlined } from "@ant-design/icons";
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

  const handleRemove = useCallback(() => {
    onRemove && onRemove(task);
  }, [task, onRemove])

  const loading = true;

  return (
    <div className={cls("upload-file-item")} title="xxxx">
      <div className="item-text">
        <PaperClipOutlined style={{ marginRight: 4 }} />
        {task.file.name}
      </div>

      <div className="upload-file-action">
        {
          loading
            ?
            <Button type="link" icon={<LoadingOutlined />}/>
            :
            <Button type="text" size="small" icon={<DeleteOutlined />} onClick={handleRemove}></Button>
        }
      </div>
    </div>
  )
})