import { observer } from "@formily/reactive-react"
import React from "react"
import "./style.less"
import cls from "classnames"
import { IconView, IIcon } from "../../../../../plugin-sdk"
import { useParseLangMessage } from "../../../../../hooks/useParseLangMessage"

export interface IComponentProps {
  title?: React.ReactNode,
  icon?: IIcon,
  className?: string,
}

const Component = observer((props: IComponentProps) => {
  const { title, icon, className, ...other } = props;
  const p = useParseLangMessage();

  return (
    <div className={cls(className, "appx-logo")} {...other}>
      <div className="logo-icon">
        <IconView icon={icon} />
      </div>
      <div className="title-text">
        {typeof (title) === "string" ? p(title) : title}
      </div>
    </div>
  )
})

export default Component;