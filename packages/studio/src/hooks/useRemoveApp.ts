import { IApp } from "../model";
import { STORAGE_KEY_APPS } from "./consts";
import { useRemove } from "./useRemove";

export function useRemoveApp(){
    return useRemove<IApp>(STORAGE_KEY_APPS)
}