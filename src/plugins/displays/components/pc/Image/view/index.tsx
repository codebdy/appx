import { observer } from "@formily/reactive-react"
import React, { CSSProperties } from "react"
import "./style.less"

export interface IImageProps {
  value?: string,
  style?: CSSProperties,
}

export const Image = observer((props: IImageProps) => {
  const { value, style, ...other } = props;
  return (
    <div className="app-image" style={{ ...style, backgroundImage: `url(${value})` }} {...other}>
    </div>
  )
})