import { IApp } from "../../../model";
import React, { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Workspace } from "../../containers";
import { SettingsPanel, ToolbarPanel, ViewportPanel, WorkspacePanel } from "../../panels";
import { MenuToolsWidget } from "../MenuToolsWidget";
import MenuDesignView from "./MenuDesignView";
import "./style.less"
import { useSetRecoilState } from "recoil";
import { navigationSelectedIdState } from "../atoms";
import { useDesingerKey } from "../../context";

const MenuWorkSpace = memo((
  props: {
    app: IApp,
  }
) => {
  const { app } = props;
  const { t } = useTranslation();
  const key = useDesingerKey();
  const setSelectedId = useSetRecoilState(
    navigationSelectedIdState(key)
  );

  const handleClick = useCallback(()=>{
    setSelectedId(undefined);
  }, [setSelectedId])

  return (
    <>
      <Workspace id="menu">
        <WorkspacePanel>
          <ToolbarPanel>
            <MenuToolsWidget />
          </ToolbarPanel>
          <ViewportPanel style={{ height: '100%' }}>
            <div className="menu-design-view-container"
              onClick={handleClick}
            >
              <MenuDesignView app={app} />
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