import React, { useCallback, useEffect, useState } from "react"
import { memo } from "react"
import { empertyConfig, EntxContext, IEntxConfig } from "./context"

export const EntRoot = memo((
  props: {
    config: {
      token?: string;
      endpoint: string;
    },
    children: React.ReactNode,
  }
) => {
  const { config, children } = props;
  const [value, setValue] = useState<IEntxConfig>()

  const setToken = useCallback((token: string | undefined) => {
    setValue((config) => ({ ...config, token } as any))
  }, [])

  const setEndpoint = useCallback((endpoint: string | undefined) => {
    setValue((config) => ({ ...config, endpoint } as any))
  }, [])

  useEffect(() => {
    setValue({
      ...config,
      setToken,
      setEndpoint
    })
  }, [config])

  return (
    <EntxContext.Provider value={value || empertyConfig}>
      {
        children
      }
    </EntxContext.Provider>
  )
})