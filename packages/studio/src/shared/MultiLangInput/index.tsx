import { TranslationOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useCallback, useState } from "react";

const MultiLangInput = () => {
  const [visiable, setVisiable] = useState(false);

  const handleClose = useCallback(() => {
    setVisiable(false)
  }, [])

  return (
    <Input.Group compact>
      <Input style={{ width: 'calc(100% - 32px)' }} />
      <Button icon={<TranslationOutlined />} style={{ width: "32px" }}></Button>
    </Input.Group>
  )
}

export default MultiLangInput;