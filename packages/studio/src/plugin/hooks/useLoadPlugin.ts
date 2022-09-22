import { IPlugin } from "@appx/plugin-sdk";
import { assert } from "console";
import { useCallback } from "react";
import { IPluginInfo, PluginType } from "../../model";
import { useAppParams } from "../../shared/AppRoot/context";
import { IInstalledPlugin, PluginStatus } from "../model";
import { useGetPluginInfo } from "./useGetPluginInfo";

declare const window: Window & { rxPlugin: IPlugin };
function trimUrl(url: string) {
  url = url.trim()
  return url.endsWith("/") ? url : (url + "/");
}

function loadJS(src: string, clearCache = false): Promise<HTMLScriptElement> {
  const p = new Promise<HTMLScriptElement>((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "text/JavaScript";
    if (clearCache) {
      script.src = src + "?t=" + new Date().getTime();
    } else {
      script.src = src;
    }
    if (script.addEventListener) {
      script.addEventListener("load", () => {
        resolve(script)
      });
      script.addEventListener("error", (e) => {
        reject(e)
      });
    }
    document.head.appendChild(script);
  })

  return p;
}

export function loadPlugin(url: string): Promise<IPlugin> {
  const path = trimUrl(url);
  const indexJs = path + "index.js";

  const p = new Promise<IPlugin>((resolve, reject) => {
    loadJS(indexJs, true)
      .then((script) => {
        const rxPlugin = window.rxPlugin
        window.rxPlugin = undefined
        resolve(rxPlugin);
        script?.remove();
      })
      .catch(err => {
        reject(err);
      })
  })

  return p;
}

export function useLoadPlugin() {
  const { app } = useAppParams();
  const getPlugInfo = useGetPluginInfo();
  const load = useCallback(async (url: string, type: PluginType, oldInfo: IPluginInfo): Promise<IInstalledPlugin> => {
    assert(url, "Plugin url is emperty");
    try {
      const plugin = await loadPlugin(url)
      return {
        pluginInfo: {
          ...getPlugInfo(plugin, url, type),
          ...oldInfo || {},
        },
        plugin,
        status: PluginStatus.Normal
      }
    } catch (error) {
      return {
        pluginInfo: {
          ...oldInfo || {},
          appUuid: app?.uuid,
          url,
          type
        },
        status: PluginStatus.Error
      }
    }
  }, [app?.uuid, getPlugInfo]);

  return load;
}