import React from "react";
import JsxParser from "../../../react-jsx-parser";

export const SvgStringIcon = React.forwardRef((
  props:{
    icon?:string,
    size?:number,
    sx?: any,
  },
  ref:any
)=>{
  const {icon, size = 24, sx, ...rest} = props;

  return (
    <div
      style={{
        width: size,
        height: size,
        '& svg':{
          width: size,
          height: size,
        },
        ...sx,
      }}
      {...rest}
      ref = {ref}
    >
      <JsxParser
        jsx = {icon}
        renderInWrapper = {false}
        blacklistedAttrs = {[]}
      />
    </div>
  )
})