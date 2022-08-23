import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { ViewportPanel, WorkspacePanel } from "../panels";
import "./style.less"
import { useAppViewKey } from "../../shared/AppRoot/context";
import { Collapse } from "antd";
const { Panel } = Collapse;

const MenuWorkSpace = memo((
  props: {

  }
) => {

  const { t } = useTranslation();
  const key = useAppViewKey();


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
              <Collapse defaultActiveKey={['muti-lang']}>
                <Panel header={t("Designer.BaseConfig")} key="other">
                  <p>Other config</p>
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