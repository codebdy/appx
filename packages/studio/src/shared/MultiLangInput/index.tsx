import { Input } from "antd";
import React, { useCallback, useState } from "react";

const MultiLangInput = () => {
  const [visiable, setVisiable] = useState(false);

  const handleClose = useCallback(() => {
    setVisiable(false)
  }, [])

  return (
    <>
      <Input addonAfter=".com" />
    </>
  )
}

export default MultiLangInput;