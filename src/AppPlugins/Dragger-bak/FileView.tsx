import React, { useCallback, useEffect } from "react"
import { memo } from "react"
import cls from "classnames";
import { DeleteOutlined, LoadingOutlined, PaperClipOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

export interface IFileTask {
  id: string,
  file: File,
  uploadedUrl?: string,
  action?: (file: File) => Promise<string>,
}

export const FileView = memo((
  props: {
    task: IFileTask,
    onRemove?: (id: string) => void,
    action?: (file: File) => Promise<string>,
    onChange: (fileTask: IFileTask) => void,
  }
) => {
  const { task, onRemove, action, onChange } = props;
  const [loading, setLoading] = useState(false);
  const [notUpload, setNotUpload] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (notUpload && action) {
      setLoading(true);
      action(task.file).then((fileUrl) => {
        onChange({ ...task, uploadedUrl: fileUrl });
        setLoading(false);
        setNotUpload(false);
      }).catch((err) => {
        setError(err);
        setLoading(false);
        setNotUpload(false);
      })
    }
  }, [notUpload, action, task.id])

  const handleRemove = useCallback(() => {
    onRemove && onRemove(task.id);
  }, [task, onRemove])

  return (
    <div className={cls("upload-file-item", { "error": error })} title={error?.message}>
      <div className="item-text">
        <PaperClipOutlined style={{ marginRight: 4 }} />
        {task.file.name}
      </div>

      <div className="upload-file-action">
        {
          loading
            ?
            <Button type="link" size="small" icon={<LoadingOutlined />} />
            :
            <Button type="text" style={{ color: "inherit" }} size="small" icon={<DeleteOutlined />} onClick={handleRemove}></Button>
        }
      </div>
    </div>
  )
})