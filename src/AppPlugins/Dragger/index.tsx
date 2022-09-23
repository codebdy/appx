import { UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { memo } from 'react';
import Dropzone from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import "./style.less"
import { formatFileSize } from "../../shared/formatFileSize"

export const Dragger = memo((props: {
  maxFiles?: number,
  children?: React.ReactNode,
}) => {
  const { maxFiles, children } = props;
  const { t } = useTranslation();

  return (
    <Dropzone maxFiles={1} onDrop={acceptedFiles => console.log(acceptedFiles)}>
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
      )
      }
    </Dropzone >
  );
})
