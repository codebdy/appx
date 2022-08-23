import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { ViewportPanel, WorkspacePanel } from "../../panels";
import "./style.less"
import { Collapse } from "antd";
import { BaseLangForm } from "./BaseForm";
const { Panel } = Collapse;

const MenuWorkSpace = memo(() => {

  const { t } = useTranslation();

  return (
    <>
      <WorkspacePanel>
        <ViewportPanel style={{ height: '100%' }}>
          <div
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                width: 800,
                marginTop: 16,
              }}
            >
              <Collapse defaultActiveKey={['base']}>
                <Panel header={t("Designer.BaseConfig")} key="base">
                  <BaseLangForm />
                </Panel>
              </Collapse>
            </div>
          </div>
        </ViewportPanel>
      </WorkspacePanel>
    </>
  )
})

export default MenuWorkSpace;