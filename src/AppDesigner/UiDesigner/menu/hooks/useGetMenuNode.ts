import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useDesignerViewKey } from "~/plugin-sdk/contexts/desinger";
import { navigationNodesState } from "../atoms";

export function useGetMenuNode() {
  const key = useDesignerViewKey();
  const nodes = useRecoilValue(navigationNodesState(key));

  const getNode = useCallback(
    (id: string) => {
      return nodes?.find((node) => node.meta.uuid === id);
    },
    [nodes]
  );

  return getNode;
}
