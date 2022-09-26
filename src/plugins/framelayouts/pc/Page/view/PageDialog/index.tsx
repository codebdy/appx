import { Modal } from "antd";
import { useAppViewKey } from "../../../../../../plugin-sdk/contexts/appRoot";
import React, { useCallback, useMemo } from "react"
import { memo } from "react"
import { IPagePopup, pagePopupsState } from "../../../../../../plugin-sdk/atoms/runner";
import { useRecoilValue } from "recoil";
import { useClosePage } from "../../../../../../shared/action/hooks/useClosePage";
import { useParseLangMessage } from "../../../../../../hooks/useParseLangMessage";
import { PageEngine } from "../../../../PageEngine";
import { components } from "../../../../../../AppRunner/PCRunner/components";

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
      visible={visalbe}
      width = {pageDialog.width}
      footer={null}
      onCancel={handleCancel}
    >
      <PageEngine
        pageId={pageDialog.pageId}
        components={components}
      />
    </Modal>
  )
})
