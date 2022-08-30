
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
    const dataSource = node?.parent?.props?.["x-component-props"]?.["dataBind"]
    if (dataSource) {
      return dataSource?.entityUuid;
    } else if (node?.parent) {
      return getRecentDataSourceUuid(node?.parent)
    }
  }, [])

  const entity = useMemo(() => {
    const entityUuid = getRecentDataSourceUuid(currentNode);
    return getEntity(entityUuid);
  }, [currentNode, getEntity, getRecentDataSourceUuid])

  return entity;
}