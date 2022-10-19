import { observer } from "@formily/react"
import React from "react"
import { useParseLangMessage } from "@rxdrag/plugin-sdk"
import { IDialogTitleProps } from "../../view/DialogTitle"

export const DialogTitleDesigner = observer((props: IDialogTitleProps) => {
  const { className, title, ...other } = props
  const p = useParseLangMessage();

  return (
    <div {...other}>
      {
        title
          ?
          p(title)
          :
          <span style={{ opacity: 0.6 }}>Please input title</span>
      }
    </div>
  )
})
