import { CloudUploadOutlined } from "@ant-design/icons";
import { observer } from "@formily/reactive-react"
import { Button, message, Upload, UploadProps } from "antd";
import { registerResourceBundle } from "../../../../i18n/registerResourceBundle";
import React from "react"
import { useLocalTranslations } from "../hooks/useLocalTranslations";
import locales, { LOCALES_NS } from "../locales"

const { Dragger } = Upload;
registerResourceBundle(LOCALES_NS, locales);

export interface ImageUploaderProps {

}

export const ImageUploader = observer((props: ImageUploaderProps) => {
  const { ...other } = props;
  const { t } = useLocalTranslations();

  const uploadProps: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Dragger {...other}{...uploadProps} listType="picture-card" >
      <p className="ant-upload-drag-icon">
        <CloudUploadOutlined />
      </p>
      <p className="ant-upload-hint">
        {t("UploadHint1")}
        <Button type="link">{t("UploadHint2")}</Button>
      </p>
    </Dragger >
  )
})