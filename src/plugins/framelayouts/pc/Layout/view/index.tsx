import { observer } from "@formily/reactive-react"
import React, { CSSProperties, useCallback, useMemo, useState } from "react"
import "./style.less"
import cls from "classnames"
import { LayoutContext } from "~/plugin-sdk/contexts/layout"

export enum FlexFlow {
  column = "column",
  row = "row"
}

export interface IComponentProps {
  flexFlow?: FlexFlow,
  className?: string,
  style?: CSSProperties,
  children?: React.ReactNode,
}

const Component = observer((props: IComponentProps) => {
  const [scrolled, setScrolled] = useState(false);

  const { flexFlow = FlexFlow.column, className, style, ...other } = props;
  const config = useMemo(() => {
    return {
      scrolled: scrolled,
      setScroll: setScrolled
    }
  }, [scrolled])
  return (
    <LayoutContext.Provider value={config}>
      <div
        className={cls("appx-layout", className)}
        style={{ flexFlow: flexFlow, ...style }}
        {...other}
      />
    </LayoutContext.Provider>
  )
})

export default Component;