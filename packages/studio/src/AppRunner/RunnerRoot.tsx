import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { SERVER_URL, SYSTEM_APP_UUID } from "../consts";
import { EntiRoot } from "../enthooks";
import { IMenuItem } from "../model/IMenuNode";
import { RouteContext } from "./context/route";

const RunnerRoot = (
  props: {
    children?: React.ReactNode,
  }
) => {
  const [mentItem, setMenuItem] = useState<IMenuItem>()
  const { appUuid = SYSTEM_APP_UUID } = useParams();

  return (
    <RouteContext.Provider value={{ menuItem: mentItem, setMenuItem: setMenuItem }}>
      <EntiRoot config={{ endpoint: SERVER_URL, appUuid: appUuid }} >
        {props.children}
      </EntiRoot>
    </RouteContext.Provider>
  )
}

export default RunnerRoot;