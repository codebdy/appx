import { ID } from "../../shared";
import { useRecoilValue } from 'recoil';
import { classesState } from "../recoil/atoms";
import { useCallback } from 'react';
import { relationsState } from '../recoil/atoms';

export function useParseRelationUuid(appId: ID) {
  const classes = useRecoilValue(classesState(appId));
  const relastions = useRecoilValue(relationsState(appId));

  const parseUuid = useCallback((uuid: string):string => {
    const [clsuuid, relationUuid] = uuid.split(",");
    return relationUuid
  }, [classes])

  return parseUuid
}