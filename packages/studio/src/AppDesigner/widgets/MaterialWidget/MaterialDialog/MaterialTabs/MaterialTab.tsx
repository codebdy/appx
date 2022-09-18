import { PlusOutlined } from "@ant-design/icons";
import { Button, Collapse } from "antd"
import { IMaterialTab } from "../../../../../material-sdk/model";
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { useParseLangMessage } from "../../../../../hooks/useParseLangMessage";
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

  return (
    <div style={{ paddingRight: 16 }}>
      <Collapse defaultActiveKey={['1']} ghost bordered={false}>
        <Panel header="This is panel header 1" key="1">
          <p>43434</p>
        </Panel>
        <Panel header="This is panel header 2" key="2">
          <p>34343434</p>
        </Panel>
        <Panel header="This is panel header 3" key="3">
          <p>vvvv</p>
        </Panel>
      </Collapse>
      <Button type='dashed' block icon={<PlusOutlined />}>{t("Materials.Add")}</Button>
    </div>
  )
})