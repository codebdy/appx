import { observer } from "@formily/reactive-react";
import { Button } from "antd";
import React from "react";
import { TextWidget } from '@designable/react'

export const GQlExpresssionInput = observer(()=>{
    return(
      <Button block>
        <TextWidget token="SettingComponents.GQlExpresssionInput.ConfigExpression" />
      </Button>
    )
})