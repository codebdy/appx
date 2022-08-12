import React, { useState } from "react";
import { IMenuItem } from "../model/IMenuNode";
import { RouteContext } from "./context/route";

const RunnerRoot = (
  props: {
    children?: React.ReactNode,
  }
) => {
  const [item, setItem] = useState<IMenuItem>()

  return (
    <RouteContext.Provider value={{ item, setItem: setItem }}>
      {props.children}
    </RouteContext.Provider>
  )
}

export default RunnerRoot;