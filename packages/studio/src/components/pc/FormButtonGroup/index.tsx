import { observer } from "@formily/reactive-react";
import React, { useCallback } from "react";
import { DnFC } from '@designable/react'
import { FormButtonGroup as FormilyFormButtonGroup } from "@formily/antd";

export type IFormButtonGroupProps = React.ComponentProps<typeof FormilyFormButtonGroup> & {
  formItem?: boolean;
  sticky?: boolean;
}

export const FormButtonGroup: DnFC<IFormButtonGroupProps> = observer((props) => {
  const { formItem, sticky, ...other } = props;
  const render = useCallback(() => {
    const group = formItem ? <FormilyFormButtonGroup.FormItem {...other} /> : <FormilyFormButtonGroup {...other} />;
    if (sticky) {
      return <FormilyFormButtonGroup.Sticky>
        {group}
      </FormilyFormButtonGroup.Sticky>
    }
    return group
  }, [formItem, other, sticky])

  return (
    render()
  )
})