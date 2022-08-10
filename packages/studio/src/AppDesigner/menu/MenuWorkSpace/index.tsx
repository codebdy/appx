import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { Workspace } from "../../containers";
import { useDesingerKey } from "../../context";
import { SettingsPanel, ToolbarPanel, ViewportPanel, WorkspacePanel } from "../../panels";
import { navigationRootNodeState } from "../atoms";
import { MenuToolsWidget } from "../MenuToolsWidget";
import MenuDesignView from "./MenuDesignView";
import "./style.less"

const MenuWorkSpace = memo(() => {
  const key = useDesingerKey();
  const rootNode = useRecoilValue(navigationRootNodeState(key));
  const { t } = useTranslation();

  return (
    <>
      <Workspace id="menu">
        <WorkspacePanel>
          <ToolbarPanel>
            <MenuToolsWidget />
          </ToolbarPanel>
          <ViewportPanel style={{ height: '100%' }}>
            <div className="menu-design-view-container">
              {
                rootNode &&
                <MenuDesignView />
              }

            </div>
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