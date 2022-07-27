import React, { useCallback } from "react"
import { memo } from "react"
import TreeNodeLabel from "./TreeNodeLabel"
import { useSelectedAppId } from "../hooks/useSelectedAppId"
import { Button } from "antd"
import { ClassMeta } from "../meta/ClassMeta";
import { PlusOutlined } from "@ant-design/icons";
import { getLocalMessage } from "../../locales/getLocalMessage";
import { useCreateClassAttribute } from "../hooks/useCreateClassAttribute";

const AttributesLabel = memo((
  props: {
    cls: ClassMeta
  }
) => {
  const { cls } = props;
  const appId = useSelectedAppId();
  const addAttribute = useCreateClassAttribute(appId);
  
  return (
    <TreeNodeLabel
      action={
        <Button
          type="text"
          shape="circle"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            addAttribute(cls);
          }}
        >
          <PlusOutlined />
        </Button>
      }
    >
      {getLocalMessage("model.Atrributes")}
    </TreeNodeLabel>
  )
})

export default AttributesLabel