import { Drawer } from "antd";
import { useDesignerViewKey } from "~/plugin-sdk/contexts/desinger";
import React, { useCallback, useMemo } from "react"
import { memo } from "react"
import { IPagePopup, pagePopupsState } from "@rxdrag/plugin-sdk/atoms";
import { useRecoilValue } from "recoil";
import { useParseLangMessage } from "@rxdrag/plugin-sdk/hooks/useParseLangMessage";
import { PageEngine } from "~/plugins/framelayouts/PageEngine";
import { useRunnerParams } from "@rxdrag/plugin-sdk/contexts/runner";
import { useClosePage } from "~/shared/action/hooks/useClosePage";

export const PageDrawer = memo((
  props: {
    pageDrawer: IPagePopup,
  }
) => {
  const { pageDrawer } = props;
  const key = useDesignerViewKey();
  const { components } = useRunnerParams();
  const pagePopups = useRecoilValue(pagePopupsState(key));
  const p = useParseLangMessage();
  const close = useClosePage();
  const visalbe = useMemo(() => !!pagePopups.find(pgDialog => pgDialog.id === pageDrawer.id), [pageDrawer.id, pagePopups])
  const handleClose = useCallback(() => {
    close();
  }, [close]);

  return (
    <Drawer
      title={p(pageDrawer.pageTitle)}
      open={visalbe}
      footer={null}
      width={pageDrawer.width}
      height={pageDrawer.height}
      placement={pageDrawer.placement}
      onClose={handleClose}
    >
      <PageEngine
        pageUuid={pageDrawer.pageId}
        components={components}
      />
    </Drawer>
  )
})
