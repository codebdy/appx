import React, { useMemo } from "react"
import { memo } from "react"
import RunnerEngine from "./RunnerEngine"
import { useParams } from "react-router-dom"
import { Device } from "@rxdrag/appx-plugin-sdk"
import { CenterSpin } from "~/common/CenterSpin"
import { NotPublished } from "./NotPublished"
import { AppRoot } from "./AppRoot"
import { SYSTEM_APP_ID } from "~/consts"
import { useQueryApp } from "./hooks/useQueryApp"
import { useShowError } from "./hooks/useShowError"

const AppRunner = memo(() => {
  const { device = Device.PC } = useParams();
  const { appId = SYSTEM_APP_ID } = useParams();
  const { app, loading, error } = useQueryApp(appId)
  useShowError(error);

  const deviceConfig = useMemo(() => {
    return app?.deviceConfigs?.find(config => config.device === device)
  }, [device, app])

  const render = useMemo(() => {
    if (loading) {
      return <CenterSpin loading={loading} />
    }

    if (deviceConfig?.published) {
      return <AppRoot app={app}>
        <RunnerEngine />
      </AppRoot>
    }

    return <NotPublished />
  }, [loading])

  return (
    render
  )
})

export default AppRunner