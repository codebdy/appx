import { observer } from "@formily/reactive-react"
import React from "react"
import { useAppParams, useAppViewKey } from "../../../../../plugin-sdk/contexts/appRoot";
import { pagePopupsState } from "../../../../../plugin-sdk/atoms/runner";
import { useParseLangMessage } from "../../../../../hooks/useParseLangMessage";
import { useRecoilValue } from "recoil";
import { RootPage } from "./RootPage";
import { ExpressionScope } from "@formily/react";
import { OpenPageType } from "../../../../../plugin-sdk/model/action";
import { PageDialog } from "./PageDialog";
import { PageDrawer } from "./PageDrawer";


export interface IComponentProps {
}

const Component = observer((props: IComponentProps) => {
  const { app } = useAppParams();
  const p = useParseLangMessage();
  const key = useAppViewKey();
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