
import { useCurrentNode } from '@designable/react';
import { TreeNode } from '@designable/core';
import { useCallback, useMemo } from 'react';
import { useGetEntity } from './useGetEntity';

export function useCurrentEntity() {
  const currentNode = useCurrentNode();
  const getEntity = useGetEntity();
  const getRecentDataSource = useCallback((node?: TreeNode) => {
    const dataSource = node?.parent?.props?.["dataSource"]
    if (dataSource) {
      return dataSource
    } else if (node?.parent) {
      return getRecentDataSource(node?.parent)
    }
  }, [])

  const entity = useMemo(() => {
    return getEntity(getRecentDataSource(currentNode)?.entityUuid);
  }, [currentNode, getEntity, getRecentDataSource])

  return entity;
}