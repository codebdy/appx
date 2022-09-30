import React from "react"
import { memo } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { Button } from "antd"
import { ClassMeta } from "../meta/ClassMeta";
import { PlusOutlined } from "@ant-design/icons";
import { useCreateClassMethod } from './../hooks/useCreateClassMethod';
import { useTranslation } from "react-i18next";
import { useEdittingAppUuid } from "../hooks/useAppUuid";

const MethodsLabel = memo((
  props: {
    cls: ClassMeta
  }
) => {
  const { cls } = props;
  const appUuid = useEdittingAppUuid();
  const addMethod = useCreateClassMethod(appUuid);
  const { t } = useTranslation();
  
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
      {t("AppUml.Methods")}
    </TreeNodeLabel>
  )
})

export default MethodsLabel