import { SettingOutlined } from "@ant-design/icons";
import { observer } from "@formily/reactive-react";
import { Button, Divider, Popover, Space, Tooltip, Tree, TreeProps } from "antd";
import { DataNode } from "antd/lib/tree";
import React, { useMemo } from "react"
import { useProTableParams } from "../../context";
import { useLocalTranslations } from "../../hooks/useLocalTranslations";
import { TitleBox } from "./TitleBox";

const ColumnsSettings = observer(() => {
  const { t } = useLocalTranslations();
  const protableParams = useProTableParams();
  
  const treeData: DataNode[] = useMemo(()=>protableParams.columns?.map(column=>({
    key: column.name,
    title: column.title
  })), [protableParams.columns])

  const handleCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };
  const content = (
    <div>
      <Tree
        checkable
        draggable
        onCheck={handleCheck}
        treeData={treeData}
      />
      <Divider style={{ margin: "8px 0" }} />
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 8px",
        }}
      >
        <Space>
          <Button size="middle" type="text">
            {t("Cancel")}
          </Button>
          <Button type="primary" size="middle">
            {t("Confirm")}
          </Button>
        </Space>
      </div>
    </div>
  );
  return (
    <Popover
      content={content}
      title={<TitleBox />}
      trigger="click"
      placement="bottom"
      overlayClassName="table-column-settings"
      showArrow={false}
    >
      <Tooltip title={t("ColumnSetting")}>
        <Button shape="circle" size="large" type="text" onClick={e => e.preventDefault()}>
          <SettingOutlined />
        </Button>
      </Tooltip>
    </Popover>
  )
})

export default ColumnsSettings