import { Drawer } from "antd";
import { useAppViewKey } from "../../../shared/AppRoot/context";
import React, { useCallback, useMemo } from "react"
import { memo } from "react"
import { IPagePopup, pagePopupsState } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";
import { useClosePage } from "../../../shared/action/hooks/useClosePage";
import { useParseLangMessage } from "../../../hooks/useParseLangMessage";

export const PageDrawer = memo((
  props: {
    pageDrawer: IPagePopup,
  }
) => {
  const { pageDrawer } = props;
  const key = useAppViewKey();
  const pagePopups = useRecoilValue(pagePopupsState(key));
  const p = useParseLangMessage();
  const close = useClosePage();
  const visalbe = useMemo(() => !!pagePopups.find(pgDialog => pgDialog.id === pageDrawer.id), [pageDrawer.id, pagePopups])
  const handleClose = useCallback(() => {
    close();
  }, [close]);

  return (
    <Drawer
      title={p(pageDrawer.title)}
      visible={visalbe}
      footer={null}
      onClose={handleClose}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  )
})
