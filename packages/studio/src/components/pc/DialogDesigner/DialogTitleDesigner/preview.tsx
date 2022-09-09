import { observer } from "@formily/react"
import React from "react"
import './locales'
import './schema'
import { IDialogTitleProps } from "../../Dialog/DialogTitle"
import { useParseLangMessage } from "../../../../hooks/useParseLangMessage"

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
