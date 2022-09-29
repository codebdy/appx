import React from "react";
import { ModelBoard } from "../common/ModelBoard";
import { ProcessList } from "./ProcessList";
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
      toolbar={<>工具栏 </>}
      propertyBox={<></>}
    >

      <ReactBpmn
        url="/public/diagram.bpmn"
      />
    </ModelBoard>
  );
}