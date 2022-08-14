import { TranslationOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useCallback, useMemo, useState } from "react";

const MultiLangInput = (
  props?: {
    multiline?: boolean,
    onChange: (event: { target: { value: string } }) => void,
    value?: string,
  }
) => {
  const { multiline, onChange, value } = props;
  const [visiable, setVisiable] = useState(false);

  const handleClose = useCallback(() => {
    setVisiable(false)
  }, [])

  const InputCtrl = useMemo(() => multiline ? Input.TextArea : Input, [multiline]);

  return (
    <Input.Group compact>
      <InputCtrl style={{ width: 'calc(100% - 32px)' }} value={value} onChange={onChange} />
      <Button icon={<TranslationOutlined />} style={{ width: "32px" }}></Button>
    </Input.Group>
  )
}

export default MultiLangInput;