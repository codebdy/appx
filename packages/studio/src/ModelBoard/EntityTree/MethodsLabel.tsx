import React from "react"
import { memo } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { Button } from "antd"
import { ClassMeta } from "../meta/ClassMeta";
import { PlusOutlined } from "@ant-design/icons";
import { getLocalMessage } from "../../locales/getLocalMessage";
import { useCreateClassMethod } from './../hooks/useCreateClassMethod';
import { useSelectedAppUuid } from "../context";

const MethodsLabel = memo((
  props: {
    cls: ClassMeta
  }
) => {
  const { cls } = props;
  const appUuid = useSelectedAppUuid();
  const addMethod = useCreateClassMethod(appUuid);

  return (
    <TreeNodeLabel
      action={
        <Button
          type="text"
          shape="circle"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            addMethod(cls);
          }}
        >
          <PlusOutlined />
        </Button>
      }
    >
      {t("model.Methods")}
    </TreeNodeLabel>
  )
})

export default MethodsLabel