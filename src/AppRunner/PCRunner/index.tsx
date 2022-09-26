import React from "react";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import { useParseLangMessage } from "../../hooks/useParseLangMessage";
import { useAppParams, useAppViewKey } from "../../plugin-sdk/contexts/appRoot";
import { pagePopupsState } from "../../plugin-sdk/atoms/runner";
import HeaderContent from "./HeaderContent";
import AppMenu from "../../plugins/framewidgets/pc/AppMenu/view";
import { PageDialog } from "../../plugins/framelayouts/pc/Page/view/PageDialog";
import { ProLayout } from "./ProLayout";
import { RootPage } from "../../plugins/framelayouts/pc/Page/view/RootPage";
import "./style.less"
import { ExpressionScope } from '@formily/react';
import { OpenPageType } from "../../plugin-sdk/model/action";
import { PageDrawer } from "../../plugins/framelayouts/pc/Page/view/PageDrawer";

export const PCRunner = memo(() => {
  const { app } = useAppParams();
  const p = useParseLangMessage();
  const key = useAppViewKey();
  const pagePopups = useRecoilValue(pagePopupsState(key));

  console.log("PCRunner 刷新")
  return (
    <div
      className="appx-pc-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        title={p(app.title)}
        logo={
          <svg style={{ width: "40px", height: "40px" }} viewBox="0 0 24 24">
            <defs>
              <linearGradient id="logo_color" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3a29e6" />
                <stop offset="90%" stopColor="#f155c3" />
                <stop offset="100%" stopColor="#3a29e6" />
              </linearGradient>
            </defs>
            <path
              style={{ fill: "url(#logo_color)" }}
              d="M23 11.5L19.95 10.37C19.69 9.22 19.04 8.56 19.04 8.56C17.4 6.92 14.75 6.92 13.11 8.56L11.63 10.04L5 3C4 7 5 11 7.45 14.22L2 19.5C2 19.5 10.89 21.5 16.07 17.45C18.83 15.29 19.45 14.03 19.84 12.7L23 11.5M17.71 11.72C17.32 12.11 16.68 12.11 16.29 11.72C15.9 11.33 15.9 10.7 16.29 10.31C16.68 9.92 17.32 9.92 17.71 10.31C18.1 10.7 18.1 11.33 17.71 11.72Z"
            />
          </svg>
        }
        menu={<AppMenu />}
        header={<HeaderContent />}
      //footer={"©Copyright 悠闲的水 2022"}
      >
        <RootPage />
        {
          pagePopups.map((pagePop) => {
            return (
              <ExpressionScope value={{
                $params: {
                  openType: OpenPageType.Dialog,
                  containerId: pagePop.id,
                  dataId: pagePop.dataId
                }
              }}>
                {
                  pagePop.openType === OpenPageType.Dialog &&
                  <PageDialog pageDialog={pagePop} />
                }
                {
                  pagePop.openType === OpenPageType.Drawer &&
                  <PageDrawer pageDrawer={pagePop} />
                }
              </ExpressionScope>
            )
          })

        }
      </ProLayout>
    </div>
  )
})
