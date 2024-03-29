import { IApp } from "~/model";
import React, { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { SettingsPanel, ToolbarPanel, ViewportPanel, WorkspacePanel } from "../../panels";
import { MenuToolsWidget } from "../MenuToolsWidget";
import MenuDesignView from "./MenuDesignView";
import "./style.less"
import { useRecoilState } from "recoil";
import { navigationSelectedIdState } from "../atoms";
import { useDesignerViewKey } from "~/plugin-sdk/contexts/desinger";
import MenuSettingsForm from "./MenuSettingsForm";
import { Empty } from "antd";

const MenuWorkSpace = memo((
  props: {
    app: IApp,
  }
) => {
  const { app } = props;
  const { t } = useTranslation();
  const key = useDesignerViewKey();
  const [selectedId, setSelectedId] = useRecoilState(
    navigationSelectedIdState(key)
  );

  const handleClick = useCallback(() => {
    setSelectedId(undefined);
  }, [setSelectedId])

  return (
    <>
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
      <SettingsPanel title={t("Panels.PropertySettings")}>
        {
          selectedId
            ?
            <MenuSettingsForm />
            :
            <Empty />
        }
      </SettingsPanel>
    </>
  )
})

export default MenuWorkSpace;