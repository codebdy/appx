import React from "react";
import { ModelToolbar } from "../common/ModelBoard/ModelToolbar";
import { ModelBoard } from "../common/ModelBoard";
import { ReactBpmn } from "./ReactBpmn";

export const AppBpmn = (props) => {

  function onShown() {
    console.log('diagram shown');
  }

  function onLoading() {
    console.log('diagram loading');
  }

  function onError(err) {
    console.log('failed to show diagram');
  }

  return (
    <ModelBoard
      listWidth={200}
      toolbar={<ModelToolbar>工具栏 </ModelToolbar>}
      propertyBox={<></>}
    >

      <ReactBpmn
        url="/public/diagram.bpmn"
      />
    </ModelBoard>
  );
}