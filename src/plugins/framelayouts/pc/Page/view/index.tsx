import { observer } from "@formily/reactive-react"
import React from "react"
import { useDesignerParams, useDesignerViewKey } from "~/plugin-sdk/contexts/desinger";
import { pagePopupsState } from "@rxdrag/plugin-sdk/atoms";
import { useParseLangMessage } from "@rxdrag/plugin-sdk/hooks/useParseLangMessage";
import { useRecoilValue } from "recoil";
import { RootPage } from "./RootPage";
import { ExpressionScope } from "@formily/react";
import { OpenPageType } from "@rxdrag/plugin-sdk/model/action";
import { PageDialog } from "./PageDialog";
import { PageDrawer } from "./PageDrawer";


export interface IComponentProps {
}

const Component = observer((props: IComponentProps) => {
  const { app } = useDesignerParams();
  const p = useParseLangMessage();
  const key = useDesignerViewKey();
  const pagePopups = useRecoilValue(pagePopupsState(key));

  return (
    <>
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
    </>
  )
})

export default Component;