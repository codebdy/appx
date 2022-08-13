import { Collapse, Switch } from 'antd';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const ConfigBoard = memo(() => {
  const { t } = useTranslation();

  return (
    <div
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div
        style={{
          width: 800,
          marginTop: 16,
        }}
      >
        <Collapse defaultActiveKey={['muti-lang']}>
          <Panel header={t("Config.MultiLang")} key="muti-lang">
            多语言
            <Switch defaultChecked />
            多语言资源
          </Panel>
          <Panel header={t("Config.Other")} key="other">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
});

export default ConfigBoard;