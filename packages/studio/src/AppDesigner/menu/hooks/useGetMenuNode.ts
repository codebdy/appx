import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useDesingerKey } from "../../context";
import { navigationNodesState } from "../atoms";

export function useGetMenuNode() {
  const key = useDesingerKey();
  const nodes = useRecoilValue(navigationNodesState(key));

  const getNode = useCallback(
    (id: string) => {
      return nodes?.find((node) => node.id === id);
    },
    [nodes]
  );

  return getNode;
}
