import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { navigationNodesState } from "../atoms";

export function useGetMenuNode() {
  const nodes = useRecoilValue(navigationNodesState);

  const getNode = useCallback(
    (id: string) => {
      return nodes?.find((node) => node.id === id);
    },
    [nodes]
  );

  return getNode;
}
