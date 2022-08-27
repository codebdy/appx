import { observer } from "@formily/reactive-react";
import React, { useCallback } from "react";
import { DnFC } from '@designable/react'
import { FormButtonGroup } from "@formily/antd";

export type IFormButtonGroupProps = React.ComponentProps<typeof FormButtonGroup> & {
  formItem?: boolean;
  sticky?: boolean;
}

export const FormButtonGroupDesigner: DnFC<IFormButtonGroupProps> = observer((props) => {
  const { formItem, sticky, ...other } = props;
  const render = useCallback(() => {
    const group = formItem ? <FormButtonGroup.FormItem {...other} /> : <FormButtonGroup {...other} />;
    if (sticky) {
      return <FormButtonGroup.Sticky>
        {group}
      </FormButtonGroup.Sticky>
    }
    return group
  }, [formItem, other, sticky])

  return (
    render()
  )
})