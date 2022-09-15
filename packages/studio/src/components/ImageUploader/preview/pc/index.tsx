import { observer } from "@formily/reactive-react"
import { Modal, Upload, UploadFile, UploadProps } from "antd";
import React, { useCallback, useEffect, useState } from "react"
import { useParseLangMessage } from "../../../../hooks/useParseLangMessage";
import ImgCrop from 'antd-img-crop';
import { useUpload } from "../../../../enthooks/hooks/useUpload";
import { isArr } from "@formily/shared";

export interface ImageUploaderProps {
  title?: string,
  maxCount?: number,
  defaultValue?: string | string[],
  value?: string | string[],
  onChange?: (value?: string | string[]) => void,
}

function getBase64(file) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as any);
    reader.onerror = error => reject(error);
  });
}

export const ImageUploader = observer((props: ImageUploaderProps) => {
  const { title, maxCount = 1, defaultValue, value, onChange, ...other } = props;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (isArr(defaultValue)) {
      setFileList(defaultValue.map(child => ({
        uid: '-1',
        status: 'done',
        name: "",
        url: child,
      })))
    } else if (defaultValue) {
      setFileList([{
        uid: '-1',
        status: 'done',
        name: "",
        url: defaultValue,
      }])
    }
  }, [defaultValue])

  const upload = useUpload();

  const p = useParseLangMessage();

  const handleChange: UploadProps['onChange'] = useCallback(({ fileList: newFileList, file, event }) => {
    setFileList(newFileList);
    if (maxCount === 1) {
      onChange && onChange(newFileList?.[0]?.url || newFileList?.[0]?.xhr?.responseURL);
    } else {
      onChange && onChange(newFileList?.map(file => file.url || file.xhr?.responseURL));
    }
  }, [maxCount, onChange]);

  const handlePreview = useCallback(async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setPreviewVisible(false);
  }, []);

  return (
    <>
      <ImgCrop rotate>
        <Upload
          {...other}
          action={upload}
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
          onPreview={handlePreview}
        >
          {fileList.length < maxCount && `+ ${p(title)}`}
        </Upload>
      </ImgCrop>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel} title={'Image View'}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  )
})