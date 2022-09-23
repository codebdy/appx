import React, { useState } from "react";
import { IMenuItem } from "../model/IMenuNode";
import { RouteContext } from "./context/route";

const RunnerRoot = (
  props: {
    children?: React.ReactNode,
  }
) => {
  const [mentItem, setMenuItem] = useState<IMenuItem>()

  return (
    <RouteContext.Provider value={{ menuItem: mentItem, setMenuItem: setMenuItem as any }}>
      {props.children}
    </RouteContext.Provider>
  )
}

export default RunnerRoot;