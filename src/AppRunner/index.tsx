import React, { useMemo } from "react"
import { memo } from "react"
import RunnerEngine from "./RunnerEngine"
import { useParams } from "react-router-dom"
import { CenterSpin } from "~/common/CenterSpin"
import { NotPublished } from "./NotPublished"
import { AppRoot } from "./AppRoot"
import { SYSTEM_APP_ID } from "~/consts"
import { useQueryApp } from "./hooks/useQueryApp"
import { useShowError } from "./hooks/useShowError"

const AppRunner = memo(() => {
  const { appId = SYSTEM_APP_ID } = useParams();
  const { app, loading, error } = useQueryApp(appId)
  useShowError(error);

  const render = useMemo(() => {
    if (loading) {
      return <CenterSpin loading={loading} />
    }

    if (app?.published) {
      return <AppRoot app={app}>
        <RunnerEngine />
      </AppRoot>
    }

    return <NotPublished />
  }, [loading, app])

  return (
    render
  )
})

export default AppRunner