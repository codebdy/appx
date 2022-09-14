import { observer } from "@formily/reactive-react"
import React from "react"

export interface IImageUploaderProps {

}

export const ImageUploader = observer((props: IImageUploaderProps) => {
  const { ...other } = props;
  return (
    <div className="rx-medias top-border" {...other}>
    </div>
  )
})