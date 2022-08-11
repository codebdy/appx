import { Tabs } from 'antd';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
const { TabPane } = Tabs;

export enum IconType {
  Normal = "normal",
  Customized = "Customized"
}

const IconSelectForm = memo(() => {
  const { t } = useTranslation();

  const handleChange = useCallback(() => {

  }, []);

  return (
    <Tabs defaultActiveKey="1" onChange={handleChange}>
      <TabPane tab={t("IconInput.IconLib")} key={IconType.Normal}>
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab={t("IconInput.Customized")} key={IconType.Customized}>
        Content of Tab Pane 2
      </TabPane>
    </Tabs>
  )
});

export default IconSelectForm;