import { observer } from "@formily/reactive-react"
import React, { useCallback, useEffect, useRef } from "react"
import "./style.less"
import cls from "classnames"
import { useLayoutParams } from "~/plugin-sdk/contexts/layout"

export interface IComponentProps {
  className?: string,
  children?: React.ReactNode
}

const Component = observer((props: IComponentProps) => {
  const { className, ...other } = props;
  const { setScrolled } = useLayoutParams();
  const ref = useRef<HTMLDivElement>(null)
  const handleScroll = useCallback((event: Event) => {
    const scrollRect = ref?.current?.getBoundingClientRect();
    if (scrollRect.y < 40) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }, [setScrolled])

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll])

  return (
    <div ref={ref} className={cls(className, "appx-content")} {...other} />
  )
})

export default Component;