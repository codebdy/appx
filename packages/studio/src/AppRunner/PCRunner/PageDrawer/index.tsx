import { Modal } from "antd";
import { useAppViewKey } from "../../../shared/AppRoot/context";
import React, { useCallback, useMemo } from "react"
import { memo } from "react"
import { IPagePopup, pagePopupsState } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";
import { useClosePage } from "../../../shared/action/hooks/useClosePage";

export const PageDrawer = memo((
  props: {
    pageDrawer: IPagePopup,
  }
) => {
  const { pageDrawer } = props;
  const key = useAppViewKey();
  const pagePopups = useRecoilValue(pagePopupsState(key));
  const close = useClosePage();
  const visalbe = useMemo(() => !!pagePopups.find(pgDialog => pgDialog.id === pageDrawer.id), [pageDrawer.id, pagePopups])
  const handleCancel = useCallback(() => {
    close();
  }, [close]);

  return (
    <Modal
      title={pageDrawer.title}
      visible={visalbe}
      footer={null}
      onCancel={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
})
