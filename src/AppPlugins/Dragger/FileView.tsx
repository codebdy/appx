import React from "react"
import { memo } from "react"

export enum FileStatus {
  waiting = 1,
  uploading,
  finished,
  error
}
export interface IFileTask {
  file: File,
}

export const FileView = memo((
  props: {
    fileTask: IFileTask,
    onRemove?: (fileTask: IFileTask) => void
  }
) => {
  const { fileTask, onRemove } = props;

  return (
    <div>

    </div>
  )
})