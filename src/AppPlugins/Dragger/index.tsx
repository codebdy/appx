import { UploadOutlined } from '@ant-design/icons';
import React, { memo, useCallback, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import "./style.less"
import { FileView, IFileTask } from './FileView';
import { createId } from '../../shared';

export const Dragger = memo((props: {
  maxFiles?: number,
  children?: React.ReactNode,
  action?: (file: File) => Promise<string>,
}) => {
  const { maxFiles, action, children } = props;

  const [tasks, setTasks] = useState<IFileTask[]>([]);
  const { t } = useTranslation();

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const newTasks = acceptedFiles?.filter(
      file => !tasks.find(task => task.file.name === file.name)
    ).map(file => ({
      id: createId(),
      file,
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
  }, [maxFiles])

  const handleRemove = useCallback((id: string) => {
    setTasks(tasks => tasks.filter(tsk => tsk.id !== id))
  }, [])

  const handleChange = useCallback((task) => {
    setTasks(tasks => tasks.map(tsk => tsk.id === task.id ? task : tsk));
  }, [])


  return (
    <Dropzone maxFiles={maxFiles} onDrop={handleDrop}>
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <section>
          <div>
            {
              tasks.map((task) => (
                <FileView key={task.id} task={task} action={action} onRemove={handleRemove} onChange={handleChange} />
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
