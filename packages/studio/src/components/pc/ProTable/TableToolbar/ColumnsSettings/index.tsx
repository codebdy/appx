import { SettingOutlined } from "@ant-design/icons";
import { observer } from "@formily/reactive-react";
import { Button, Checkbox, Divider, Popover, Space, Tooltip, Tree, TreeProps } from "antd";
import { DataNode } from "antd/lib/tree";
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useProTableParams } from "../../context";
import { useLocalTranslations } from "../../hooks/useLocalTranslations";

enum CheckState {
  half = 1,
  all,
  none,
}

const ColumnsSettings = observer(() => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const { t } = useLocalTranslations();
  const protableParams = useProTableParams();

  const reset = useCallback(() => {
    if (!protableParams.tableConfig?.columns) {
      setSelectedColumns(protableParams?.columns?.map(column => column.name) || [])
    } else {
      setSelectedColumns(protableParams.tableConfig?.columns.filter(column => protableParams?.columns?.find(col => col.name === column)));
    }
  }, [protableParams?.columns, protableParams.tableConfig?.columns])

  useEffect(() => {
    reset()
  }, [reset])

  const checkState: CheckState = useMemo(() => {
    if (selectedColumns.length && selectedColumns.length === protableParams?.columns?.length) {
      return CheckState.all;
    } else if (selectedColumns.length) {
      return CheckState.half;
    } else {
      return CheckState.none;
    }
  }, [protableParams?.columns?.length, selectedColumns.length])

  const treeData: DataNode[] = useMemo(() => protableParams.columns?.map(column => ({
    key: column.name,
    title: column.title
  })), [protableParams.columns])

  const handleCheck: TreeProps['onCheck'] = useCallback((checkedKeys, info) => {
    setSelectedColumns(checkedKeys as any || [])
  }, []);

  const handleAllCheckChange = useCallback(() => {
    if (checkState === CheckState.half || checkState === CheckState.none) {
      setSelectedColumns(protableParams?.columns?.map(column => column.name) || [])
    } else {
      setSelectedColumns([])
    }
  }, [checkState, protableParams?.columns])

  const handleCancel = useCallback(() => {

  }, [])

  const handleConfirm = useCallback(() => {

  }, [])

  const content = (
    <div>
      <Tree
        checkable
        draggable
        checkedKeys={selectedColumns}
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
          <Button size="middle" type="text" onClick={handleCancel}>
            {t("Cancel")}
          </Button>
          <Button type="primary" size="middle" onClick={handleConfirm}>
            {t("Confirm")}
          </Button>
        </Space>
      </div>
    </div>
  );
  return (
    <Popover
      content={content}
      title={
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "8px 0 ",
        }}>
          <Checkbox
            checked={checkState !== CheckState.none}
            indeterminate={checkState === CheckState.half}
            onChange={handleAllCheckChange}
          >{t("ShowColumns")}</Checkbox>
          <Space>
            <Button type="link" size="small" onClick={reset}>
              {t("Reset")}
            </Button>
          </Space>
        </div>
      }
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