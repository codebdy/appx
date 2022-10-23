import React, { memo } from "react"
import { IApp } from "~/model";

export const AppRoot = memo((
  props: {
    app: IApp,
    children?: React.ReactNode
  }
) => {
  const { children } = props;
  return (
    <>
      {
        children
      }
    </>
  )
})