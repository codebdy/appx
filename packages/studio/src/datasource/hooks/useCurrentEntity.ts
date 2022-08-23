
import { useCurrentNode } from '@designable/react';
import { TreeNode } from '@designable/core';
import { useCallback, useMemo } from 'react';
import { useGetEntity } from './useGetEntity';

export function useCurrentEntity() {
  const currentNode = useCurrentNode();
  const getEntity = useGetEntity();
  const getRecentDataSourceUuid = useCallback((node?: TreeNode) => {
    const fieldSource = node?.parent?.props?.["x-field-source"];
    if (fieldSource?.["typeUuid"]) {
      return fieldSource?.["typeUuid"];
    }
    const dataSource = node?.parent?.props?.["x-component-props"]?.["dataBindSource"]
    if (dataSource) {
      return dataSource
    } else if (node?.parent) {
      return getRecentDataSourceUuid(node?.parent)
    }
  }, [])

  const entity = useMemo(() => {
    return getEntity(getRecentDataSourceUuid(currentNode));
  }, [currentNode, getEntity, getRecentDataSourceUuid])

  return entity;
}