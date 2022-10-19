import React from "react"
import { memo } from "react"
import TreeNodeLabel from "~/common/TreeNodeLabel"
import { Button } from "antd"
import { ClassMeta } from "../meta/ClassMeta";
import { PlusOutlined } from "@ant-design/icons";
import { useCreateClassAttribute } from "../hooks/useCreateClassAttribute";
import { useTranslation } from "react-i18next";
import { useEdittingAppUuid } from "~/hooks/useEdittingAppUuid";

const AttributesLabel = memo((
  props: {
    cls: ClassMeta
  }
) => {
  const { cls } = props;
  const { t } = useTranslation();
  const appUuid = useEdittingAppUuid();
  const addAttribute = useCreateClassAttribute(appUuid);
  
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
      {t("AppUml.Atrributes")}
    </TreeNodeLabel>
  )
})

export default AttributesLabel