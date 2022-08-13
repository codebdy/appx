import { FormOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
import React from "react";
import { memo } from "react";

const LangSelect = memo(() => {
  return (
    <>
      <Button>
        <div>
          <Tag>中文</Tag>
          <Tag>English</Tag>
          <Tag>日本语</Tag>
          <FormOutlined style={{ marginLeft: 8 }} />
        </div>
      </Button>
    </>
  )
})

export default LangSelect;