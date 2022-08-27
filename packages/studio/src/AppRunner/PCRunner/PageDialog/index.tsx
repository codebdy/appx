import { Modal } from "antd";
import { useAppViewKey } from "../../../shared/AppRoot/context";
import React, { useCallback, useMemo } from "react"
import { memo } from "react"
import { IPagePopup, pagePopupsState } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";
import { useClosePage } from "../../recoil/useClosePage";

export const PageDialog = memo((
  props: {
    pageDialog: IPagePopup,
  }
) => {
  const { pageDialog } = props;
  const key = useAppViewKey();
  const pagePopups = useRecoilValue(pagePopupsState(key));
  const close = useClosePage();
  const visalbe = useMemo(() => !!pagePopups.find(pgDialog => pgDialog.id === pageDialog.id), [pageDialog.id, pagePopups])
  const handleCancel = useCallback(() => {
    close();
  }, [close]);

  return (
    <Modal
      title={pageDialog.title}
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
