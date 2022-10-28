import React, { useCallback, useMemo } from "react"
import { memo } from "react"
import RunnerEngine from "./RunnerEngine"
import { useParams } from "react-router-dom"
import { CenterSpin } from "~/common/CenterSpin"
import { NotReady } from "./NotReady"
import { AppRoot } from "./AppRoot"
import { SYSTEM_APP_ID } from "~/consts"
import { useQueryApp } from "./hooks/useQueryApp"
import { useShowError } from "./hooks/useShowError"
import { useTranslation } from "react-i18next"

const AppRunner = memo(() => {
  const { appId = SYSTEM_APP_ID } = useParams();
  const { t } = useTranslation();
  const { app, loading, error } = useQueryApp(appId)
  useShowError(error);
  if (loading) {
    return <CenterSpin loading={loading} />
  }

  if (!app?.published) {
    return <NotReady title={t("NotPublishedTip")} />
  }

  return (
    <AppRoot app={app}>
      <RunnerEngine />
    </AppRoot>
  )
})

export default AppRunner