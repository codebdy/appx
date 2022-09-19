import { PlusOutlined } from "@ant-design/icons";
import { Button, Collapse } from "antd"
import { IMaterialCollapseItem, IMaterialTab } from "../../../../../plugin-sdk/model";
import React, { useCallback } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { createUuid } from "../../../../../shared";
import { GroupLabel } from "./GroupLabel";
const { Panel } = Collapse;

export const MaterialTab = memo((
  props: {
    tab: IMaterialTab,
    onChange: (tab: IMaterialTab) => void,
  }
) => {
  const { tab, onChange } = props;
  const { t } = useTranslation();

  const handleAdd = useCallback(() => {
    onChange({
      ...tab, collopsesItems: [...tab.collopsesItems, {
        uuid: createUuid(),
        title: "Group",
        components: [],
      }]
    })
  }, [onChange, tab])

  const handleChange = useCallback((group: IMaterialCollapseItem) => {
    onChange({ ...tab, collopsesItems: tab.collopsesItems.map(item => item.uuid === group.uuid ? group : item) })
  }, [onChange, tab])

  const handleRemove = useCallback((uuid: string) => {
    onChange({ ...tab, collopsesItems: tab.collopsesItems.filter(item => item.uuid !== uuid) })
  }, [onChange, tab])

  return (
    <div>
      <Collapse defaultActiveKey={[tab.collopsesItems?.[0]?.uuid]} ghost bordered={false}>
        {
          tab.collopsesItems.map((item, index) => {
            return (
              <Panel
                header={<GroupLabel group={item} onChange={handleChange} onRemove={handleRemove} />}
                key={item.uuid}
              >
                <p>43434</p>
              </Panel>
            )
          })
        }
      </Collapse>
      <div style={{ padding: "0 16px" }}>
        <Button
          type='dashed'
          block
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          {t("Materials.Add")}
        </Button>
      </div>
    </div>
  )
})