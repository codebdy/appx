import { findNodeByComponentPath } from "../shared";
import { useTreeNode } from '@designable/react';
import { useCallback, useEffect, useMemo } from "react";
import { TreeNode } from '@designable/core';

export function useTriggerableNode(show: boolean | undefined, name: string) {
  const node = useTreeNode()

  const parentNodeName = useMemo(
    () => node?.props?.["x-component"],
    [node?.props]
  )
  const path = useMemo(
    () => (`${parentNodeName}.${name}`),
    [name, parentNodeName]
  )

  const findAction = useCallback(() => {
    return findNodeByComponentPath(node, [
      parentNodeName,
      path,
    ])
  }, [node, parentNodeName, path]);

  useEffect(() => {
    const headerActions = findAction();
    if (show && !headerActions) {
      const extra = new TreeNode({
        componentName: 'Field',
        props: {
          type: 'void',
          'x-component': path,
        },
      })
      node.append(extra)
    } else if (!show && headerActions) {
      headerActions.remove();
    }
  }, [findAction, node, path, show])

  return findAction();
}