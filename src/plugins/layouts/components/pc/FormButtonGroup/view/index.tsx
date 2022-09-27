import { observer } from "@formily/reactive-react";
import React, { useCallback } from "react";
import { DnFC } from '@designable/react'
import { FormButtonGroup as FormilyFormButtonGroup } from "@formily/antd";

export type IFormButtonGroupProps = React.ComponentProps<typeof FormilyFormButtonGroup> & {
  formItem?: boolean;
  sticky?: boolean;
}

const FormButtonGroup: DnFC<IFormButtonGroupProps> = observer((props) => {
  const { formItem, sticky, children, ...other } = props;
  const render = useCallback(() => {
    let group = <FormilyFormButtonGroup {...other}>
      {children}
    </FormilyFormButtonGroup>
    if (formItem) {
      group = <FormilyFormButtonGroup.FormItem >
        {group}
      </FormilyFormButtonGroup.FormItem>
    }
    if (sticky) {
      group = <FormilyFormButtonGroup.Sticky>
        {group}
      </FormilyFormButtonGroup.Sticky>
    }
    return group
  }, [children, formItem, other, sticky])

  return (
    render()
  )
})

export default FormButtonGroup;