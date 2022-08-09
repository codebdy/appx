import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Workspace } from "../../containers";
import { SettingsPanel, ViewportPanel, WorkspacePanel } from "../../panels";

const MenuWorkSpace = memo(() => {
  const { t } = useTranslation();
  return (
    <>
      <Workspace id="menu">
        <WorkspacePanel>
          <ViewportPanel style={{ height: '100%' }}>
            呵呵呵
          </ViewportPanel>
        </WorkspacePanel>
      </Workspace>
      <SettingsPanel title={t("Panels.PropertySettings")}>
        哈哈哈
      </SettingsPanel>
    </>
  )
})

export default MenuWorkSpace;