import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useAppKey } from "../../../shared/AppRoot/context";
import { navigationNodesState } from "../atoms";

export function useGetMenuNode() {
  const key = useAppKey();
  const nodes = useRecoilValue(navigationNodesState(key));

  const getNode = useCallback(
    (id: string) => {
      return nodes?.find((node) => node.meta.uuid === id);
    },
    [nodes]
  );

  return getNode;
}
