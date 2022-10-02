import React, { memo } from "react";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js-properties-panel/dist/assets/properties-panel.css";
import "./style.less"
import AppRoot from "../shared/AppRoot";
import { AppBpmnInner } from "./AppBpmnInner";

export const AppBpmn = memo((props) => {
  return (
    <AppRoot>
      <AppBpmnInner />
    </AppRoot>
  );
})