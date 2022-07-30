import React, { memo } from "react";
import "@antv/x6-react-shape";
import "./index.less"
import ModelsBoard from ".";
import { SYSTEM_APP_UUID } from "./recoil/atoms";

const SystemModelBoard = memo(() => {
  return (
    <ModelsBoard appUuid={SYSTEM_APP_UUID} />
  );
});

export default SystemModelBoard;