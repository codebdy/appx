import { Modal } from "antd";
import { useAppViewKey } from "../../../shared/AppRoot/context";
import React, { useCallback, useMemo } from "react"
import { memo } from "react"
import { IPageDialog, pageDialogsState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { PageContext } from "../../context/page";
import { OpenPageType } from "../../../../src/shared/action";

export const PageDialog = memo((
  props: {
    pageDialog: IPageDialog,
  }
) => {
  const { pageDialog } = props;
  const key = useAppViewKey();
  const [pageDialogs, setPageDialogs] = useRecoilState(pageDialogsState(key));

  const visalbe = useMemo(() => !!pageDialogs.find(pgDialog => pgDialog.id === pageDialog.id), [pageDialog.id, pageDialogs])
  const handleCancel = useCallback(() => {
    setPageDialogs(pgDialogs => pgDialogs.filter(pgDialog => pgDialog.id !== pageDialog.id))
  }, [pageDialog.id, setPageDialogs]);

  return (
    <PageContext.Provider value={{ openType: OpenPageType.Dialog, containerId: pageDialog.id }}>
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
    </PageContext.Provider>
  )
})
