
import { useDeleteById, IDeleteOptions } from "~/enthooks/hooks/useDeleteById";
import { IPluginInfo } from "~/model";

export function useDeletePluginInfo(options?: IDeleteOptions<IPluginInfo>) {
    return useDeleteById<IPluginInfo>("PluginInfo", options)
}