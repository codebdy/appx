import React, { useCallback, useEffect, useState } from "react"
import { memo } from "react"
import { EntxContext, IEntxConfig } from "./context"

export const EntRoot = memo((
  props: {
    config?: {
      token?: string;
    },
    children: React.ReactNode,
  }
) => {
  const { config, children } = props;
  const [value, setValue] = useState<IEntxConfig>()

  const setToken = useCallback((token: string | undefined) => {
    setValue((config) => ({ ...config, token }))
  }, [])

  useEffect(() => {
    setValue({
      token: config?.token,
      setToken
    })
  }, [])

  return (
    <EntxContext.Provider value={value}>
      {
        children
      }
    </EntxContext.Provider>
  )
})