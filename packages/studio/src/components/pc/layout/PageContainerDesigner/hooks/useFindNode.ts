import { findNodeByComponentPath } from "../../../../common/shared";
import { useTreeNode } from '@designable/react';
import { useCallback, useMemo } from "react";

export function useFindNode(name: string) {
  const node = useTreeNode()

  const parentNodeName = useMemo(
    () => node?.props?.["x-component"],
    [node?.props]
  )
  const path = useMemo(
    () => (`${parentNodeName}.${name}`),
    [name, parentNodeName]
  )

  const findNode = useCallback(() => {
    return findNodeByComponentPath(node, [
      parentNodeName,
      path,
    ])
  }, [node, parentNodeName, path]);
  return findNode();
}