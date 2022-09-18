import { PlusOutlined } from "@ant-design/icons";
import { Button, Collapse } from "antd"
import { IMaterialTab } from "../../../../../material-sdk/model";
import React, { useCallback } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { useParseLangMessage } from "../../../../../hooks/useParseLangMessage";
import { createUuid } from "../../../../../shared";
const { Panel } = Collapse;

export const MaterialTab = memo((
  props: {
    tab: IMaterialTab,
    onChange: (tab: IMaterialTab) => void,
  }
) => {
  const { tab, onChange } = props;
  const { t } = useTranslation();
  const p = useParseLangMessage();

  const handleAdd = useCallback(() => {
    onChange({
      ...tab, collopsesItems: [...tab.collopsesItems, {
        uuid: createUuid(),
        title: "Group",
        components: [],
      }]
    })
  }, [onChange, tab])

  return (
    <div style={{ paddingRight: 16 }}>
      <Collapse defaultActiveKey={[tab.collopsesItems?.[0]?.uuid]} ghost bordered={false}>
        {
          tab.collopsesItems.map((item, index) => {
            return (
              <Panel header={p(item.title)} key={item.uuid}>
                <p>43434</p>
              </Panel>
            )
          })
        }
      </Collapse>
      <Button
        type='dashed'
        block
        icon={<PlusOutlined />}
        onClick={handleAdd}
      >
        {t("Materials.Add")}
      </Button>
    </div>
  )
})