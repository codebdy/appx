import { ID } from "../shared";
import { useApp } from "./useApp";
import { useEffect, useState } from 'react';
import { Device, IApp, IPage } from "../model";
import { STORAGE_KEY_PAGES } from "./consts";
import { getMockeData } from "./getMockeData";
import { IMenu } from '../model/index';

export function useAppDevicePages(id: ID, device: Device) {
  const [app, setApp] = useState<IApp>();
  const { data, loading, error } = useApp(id);
  useEffect(() => {
    if (data) {
      data.pages = getMockeData<IPage[]>(STORAGE_KEY_PAGES)?.filter(
        page => page.app?.id === id && page.device === device
      ) || [];
      data.menus = getMockeData<IMenu[]>(STORAGE_KEY_PAGES)?.filter(
        menu => menu.app?.id === id && menu.device === device
      ) || [];
    }
  }, [data])
  return { data: app, loading, error }
}