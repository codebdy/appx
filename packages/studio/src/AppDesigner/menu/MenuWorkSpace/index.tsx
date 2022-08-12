import { IApp, IPage, IPageCategory } from "../../../model";
import React, { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Workspace } from "../../containers";
import { SettingsPanel, ToolbarPanel, ViewportPanel, WorkspacePanel } from "../../panels";
import { MenuToolsWidget } from "../MenuToolsWidget";
import MenuDesignView from "./MenuDesignView";
import "./style.less"
import { useRecoilState } from "recoil";
import { navigationSelectedIdState } from "../atoms";
import { useDesingerKey } from "../../context";
import MenuSettingsForm from "./MenuSettingsForm";
import { Empty } from "antd";

const MenuWorkSpace = memo((
  props: {
    app: IApp,
    categories: IPageCategory[],
    pages: IPage[]
  }
) => {
  const { app, categories, pages } = props;
  const { t } = useTranslation();
  const key = useDesingerKey();
  const [selectedId, setSelectedId] = useRecoilState(
    navigationSelectedIdState(key)
  );

  const handleClick = useCallback(() => {
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
        {
          selectedId
            ?
            <MenuSettingsForm categories={categories} pages={pages} />
            :
            <Empty />
        }
      </SettingsPanel>
    </>
  )
})

export default MenuWorkSpace;