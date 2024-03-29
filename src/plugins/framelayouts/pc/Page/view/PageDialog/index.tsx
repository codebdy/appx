import { Modal } from "antd";
import React, { useCallback, useMemo } from "react"
import { memo } from "react"
import { IPagePopup, pagePopupsState } from "@rxdrag/plugin-sdk/atoms";
import { useRecoilValue } from "recoil";
import { useClosePage } from "~/shared/action/hooks/useClosePage";
import { useParseLangMessage } from "@rxdrag/plugin-sdk/hooks/useParseLangMessage";
import { PageEngine } from "../../../../PageEngine";
import { useAppViewKey } from "~/plugin-sdk/contexts/app";
export const PageDialog = memo((
  props: {
    pageDialog: IPagePopup,
  }
) => {
  const { pageDialog } = props;
  const key = useAppViewKey();
  const pagePopups = useRecoilValue(pagePopupsState(key));
  const p = useParseLangMessage();
  const close = useClosePage();
  const visalbe = useMemo(() => !!pagePopups.find(pgDialog => pgDialog.id === pageDialog.id), [pageDialog.id, pagePopups])
  const handleCancel = useCallback(() => {
    close();
  }, [close]);

  return (
    <Modal
      title={p(pageDialog.pageTitle)}
      open={visalbe}
      width={pageDialog.width}
      footer={null}
      onCancel={handleCancel}
    >
      <PageEngine
        pageUuid={pageDialog.pageUuid}
      />
    </Modal>
  )
})
