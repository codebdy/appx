import React, { memo } from "react";
import "@antv/x6-react-shape";
import "./index.less"
import ModelsBoard from ".";
import { SYSTEM_APP_UUID } from "./recoil/atoms";

const SystemModelBoard = memo(() => {
  return (
    <div className="system-model-border">
      <ModelsBoard appUuid={SYSTEM_APP_UUID} />    
    </div>

  );
});

export default SystemModelBoard;