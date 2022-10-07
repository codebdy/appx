import { Button } from "antd"
import React, { useCallback } from "react";
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { useShowError } from "../../hooks/useShowError";
import { ID } from "../../shared"
import { useDeployProcess } from "../hooks/useDeployProcess";

export const DeplayButton = memo((
  props: {
    selectedProcessId?: ID,
    changed?: boolean,
  }
) => {
  const { selectedProcessId, changed } = props;
  const [deloy, { error, loading }] = useDeployProcess(selectedProcessId);
  const { t } = useTranslation();

  useShowError(error);

  const handleClick = useCallback(() => {
    deloy();
  }, [deloy])

  return (
    <Button
      disabled={!selectedProcessId || changed}
      loading={loading}
      onClick={handleClick}
    >
      {t("Publish")}
    </Button>
  )
})