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
    <Tabs defaultActiveKey={IconType.Normal} onChange={handleChange}>
      <TabPane className='icon-pannel' tab={t("IconInput.IconLib")} key={IconType.Normal}>
        Content of Tab <br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1
        Content of Tab <br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1
        Content of Tab <br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1
        Content of Tab <br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1
        Content of Tab <br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1<br />Pane 1
      </TabPane>
      <TabPane className='icon-pannel' tab={t("IconInput.Customized")} key={IconType.Customized}>
        Content of Tab Pane 2
      </TabPane>
    </Tabs>
  )
});

export default IconSelectForm;