import { SettingOutlined } from "@ant-design/icons";
import { observer } from "@formily/reactive-react";
import { Button, Checkbox, Divider, Popover, Space, Tooltip } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useProTableParams } from "../../context";
import { useLocalTranslations } from "../../hooks/useLocalTranslations";
import DraggableLabel from "./DraggableLabel";
import "./style.less"

enum CheckState {
  half = 1,
  all,
  none,
}

const ColumnsSettings = observer(() => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [sortedColumns, setSortedColumns] = useState<string[]>([]);
  const [visible, setVisable] = useState(false);
  const { t } = useLocalTranslations();
  const protableParams = useProTableParams();

  const reset = useCallback(() => {
    if (!protableParams.tableConfig?.columns) {
      setSelectedColumns(protableParams?.columns?.map(column => column.name) || [])
    } else {
      setSelectedColumns(protableParams.tableConfig?.columns.filter(column => protableParams?.columns?.find(col => col.name === column)));
    }
    if (!protableParams.tableConfig?.sortedColumns) {
      setSortedColumns(protableParams?.columns?.map(column => column.name) || [])
    } else {
      setSortedColumns(protableParams.tableConfig?.sortedColumns.filter(column => protableParams?.columns?.find(col => col.name === column)));
    }
  }, [protableParams?.columns, protableParams.tableConfig?.columns, protableParams.tableConfig?.sortedColumns])

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
  }, [protableParams?.columns?.length, selectedColumns.length]);

  const columns = useMemo(() => {
    const sCols = sortedColumns.map(column => {
      const col = protableParams?.columns?.find(col => col.name === column)
      return col
    })

    return [...sCols, ...protableParams?.columns?.filter(col => !sortedColumns?.find(column => col.name === column)) || []];
  }, [protableParams?.columns, sortedColumns])

  const handleAllCheckChange = useCallback(() => {
    if (checkState === CheckState.half || checkState === CheckState.none) {
      setSelectedColumns(protableParams?.columns?.map(column => column.name) || [])
    } else {
      setSelectedColumns([])
    }
  }, [checkState, protableParams?.columns])

  const handleCancel = useCallback(() => {
    setVisable(false);
    reset();
  }, [reset])

  const handleConfirm = useCallback(() => {

  }, [])

  const handelVisableChange = useCallback((vb) => {
    setVisable(vb);
  }, [])

  const handleChange = useCallback((name: string, checked: boolean) => {
    if(!checked && selectedColumns.find(col=>col === name)){
      setSelectedColumns(columns=>columns.filter(col=>col !== name));
    }else if(checked && !selectedColumns.find(col=>col === name)){
      setSelectedColumns(columns=>([...columns, name]));
    }
  }, [selectedColumns])

  const content = (
    <div className="columns-settings">
      <div className="columns-list">
        {
          columns?.map(column => {
            return (
              <DraggableLabel
                key={column.name}
                name={column.name}
                title={column.title}
                checked={!!selectedColumns?.find(col => col === column.name)}
                onChange={handleChange}
              />
            )
          })
        }
      </div>
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
      visible={visible}
      onVisibleChange={handelVisableChange}
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