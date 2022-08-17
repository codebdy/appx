
import { useCurrentNode } from '@designable/react'
import { useCallback, useMemo } from 'react';
import { useGetEntity } from './useEntity';

export function useCurrentEntity(){
  const node = useCurrentNode();
  const getEntity = useGetEntity();
  const getRecentDataSource = useCallback(()=>{
    const dataSource = node?.parent?.props?.["dataSource"]
    if(dataSource){
      return dataSource
    } else if(node?.parent){
      return getRecentDataSource(node?.parent)
    }
  }, [node?.parent])

  const entity = useMemo(()=>{
    return getEntity(getRecentDataSource()?.enitityUuid);
  }, [getEntity, getRecentDataSource])  

  return entity;
}