import React from "react";
import ReactBpmn from 'react-bpmn';
import "./style.less";

export const AppFlow = (props) => {

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
    <ReactBpmn
      url="/public/diagram.bpmn"
      style={{ height: "100%" }}
      onShown={onShown}
      onLoading={onLoading}
      onError={onError}
    />
  );
}