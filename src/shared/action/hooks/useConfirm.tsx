import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useParseLangMessage } from "../../../hooks/useParseLangMessage";
import React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { IConfirmAction } from "../../../plugin-sdk/model/action";

export function useConfirm() {
  const { t } = useTranslation();
  const p = useParseLangMessage();

  const confirm = useCallback((action: IConfirmAction) => {
    const pms = new Promise((resolve, reject) => {
      Modal.confirm({
        title: p(action?.boxTitle) || t('Confirm'),
        icon: <ExclamationCircleOutlined />,
        content: p(action?.message),
        okText: t("Confirm"),
        cancelText: t("Cancel"),
        onCancel: () => reject(),
        onOk: () => resolve(undefined),
      });
    })
    return pms;
  }, [p, t])


  return confirm;
}