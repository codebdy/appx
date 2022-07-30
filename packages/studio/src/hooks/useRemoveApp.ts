import { IApp } from "../model";
import { useRemove } from "./useRemove";

export function useRemoveApp(){
    return useRemove<IApp>(STORAGE_KEY_APPS)
}