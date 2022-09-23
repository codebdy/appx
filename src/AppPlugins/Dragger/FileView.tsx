import React from "react"
import { memo } from "react"
import { formatFileSize } from "../../shared/formatFileSize";
import cls from "classnames";

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
    <div className={cls("upload-file-item")}>
      {task.file.name} - {formatFileSize(task.file.size)}
    </div>
  )
})