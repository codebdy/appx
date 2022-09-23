import { UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import "./style.less"
import { formatFileSize } from "../../shared/formatFileSize"
import { IFileTask } from './FileView';

export const Dragger = memo((props: {
  maxFiles?: number,
  children?: React.ReactNode,
}) => {
  const { maxFiles, children } = props;
  const [tasks, setTasks] = useState<IFileTask[]>([]);
  const { t } = useTranslation();

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const newTasks = acceptedFiles?.filter(
      file => !tasks.find(task => task.file.name === file.name)
    ).map(file => ({
      file
    }))
    if (!maxFiles) {
      setTasks((tasks) => [...tasks, ...newTasks])
    } else {
      setTasks(tasks => {
        const count = maxFiles - tasks.length
        if (count > 0) {
          newTasks.splice(0, count)
          return [...tasks, ...newTasks]
        }
        return tasks;
      })
    }
    console.log(acceptedFiles)
  }, [maxFiles])

  return (
    <Dropzone maxFiles={maxFiles} onDrop={handleDrop}>
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <section>
          <div>
            {
              acceptedFiles.map((file: any) => (
                <li key={file.path}>
                  {file.path} - {formatFileSize(file.size)}
                </li>
              ))
            }
          </div>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className='appx-upload-dragger'>
              <div className="upload-drag-icon">
                <UploadOutlined />
              </div>
              <div className="upload-hint">
                {t("UploadHint1")}
                <a type="link" style={{ marginLeft: 8 }}>{t("UploadHint2")}</a>
              </div>
            </div>
          </div>
        </section>
      )}
    </Dropzone >
  );
})
