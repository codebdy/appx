import React, { useMemo } from "react"
import { memo } from "react"
import { DESIGNER_TOKEN_NAME } from "../consts"
import RunnerEngine from "./RunnerEngine"
import { useEdittingAppId } from "~/hooks/useEdittingAppUuid"
import { useQueryApp } from "~/hooks/useQueryApp"
import { useShowError } from "~/hooks/useShowError"
import { useParams } from "react-router-dom"
import { Device } from "@rxdrag/appx-plugin-sdk"
import { CenterSpin } from "~/common/CenterSpin"
import { NotPublished } from "./NotPublished"
import { AppRoot } from "./AppRoot"

const AppRunner = memo(() => {
  const { device = Device.PC } = useParams();
  const appId = useEdittingAppId();
  const { app, loading, error } = useQueryApp(appId)
  useShowError(error);

  const deviceConfig = useMemo(() => {
    return app?.deviceConfigs?.find(config => config.device === device)
  }, [device, app])

  const render = useMemo(() => {
    if (loading) {
      return <CenterSpin loading = {loading} />
    }

    if (deviceConfig?.published) {
      return <AppRoot app={app}>
        <RunnerEngine />
      </AppRoot>
    }

    return <NotPublished/>
  }, [loading])

  return (
    render
  )
})

export default AppRunner