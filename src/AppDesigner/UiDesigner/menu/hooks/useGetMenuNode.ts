import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useAppViewKey } from "@rxdrag/plugin-sdk/contexts/appRoot";
import { navigationNodesState } from "../atoms";

export function useGetMenuNode() {
  const key = useAppViewKey();
  const nodes = useRecoilValue(navigationNodesState(key));

  const getNode = useCallback(
    (id: string) => {
      return nodes?.find((node) => node.meta.uuid === id);
    },
    [nodes]
  );

  return getNode;
}