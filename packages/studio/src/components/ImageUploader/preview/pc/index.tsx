import { observer } from "@formily/reactive-react"
import { Upload, UploadFile, UploadProps } from "antd";
import React, { useCallback, useState } from "react"
import { useParseLangMessage } from "../../../../hooks/useParseLangMessage";
import ImgCrop from 'antd-img-crop';
import { RcFile } from "antd/lib/upload";

export interface ImageUploaderProps {
  title?: string,
  maxCount?: number,
  value?: string | string[],
  onChange?: (value?: string | string[]) => void,
}

export const ImageUploader = observer((props: ImageUploaderProps) => {
  const { title, maxCount = 1, value, onChange, ...other } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: '',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const p = useParseLangMessage();

  const handleChange: UploadProps['onChange'] = useCallback(({ fileList: newFileList }) => {
    setFileList(newFileList);
  }, []);

  const handlePreview = useCallback(async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  }, []);

  return (
    <ImgCrop rotate>
      <Upload
        {...other}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onChange={handleChange}
        onPreview={handlePreview}
      >
        {fileList.length < maxCount && `+ ${p(title)}`}
      </Upload>
    </ImgCrop>
  )
})