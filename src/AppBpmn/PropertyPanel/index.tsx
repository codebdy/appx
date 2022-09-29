import React from "react"
import { memo } from "react"
import { TaskPanel } from "./TaskPanel"
import "./style.less"

export const PropertyPanel = memo((props: {
  element?: any,
  modeler?: any,
}) => {
  const { element, modeler } = props;
  return (
    <div>
      {
        element?.type === "bpmn:Task" &&
        <TaskPanel key={element?.id} element={element} modeler={modeler} />
      }
    </div>
  )
})