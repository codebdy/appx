import { isStr } from "@formily/shared";
import { IPlugin } from "@rxdrag/appx-plugin-sdk";
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
    // fetch(src, {
    //   method: 'GET',
    //   mode: 'cors',
    //   credentials: 'omit',
    // }).then((response) => {
    //   console.log("响应", response)
    //   if (!response.ok) {
    //     console.error('Network response was not ok')
    //     reject('Network response was not ok');
    //     return;
    //   }
    //   return response.text();
    // }).catch((err) => {
    //   reject(err)
    // }).then(data => {
    //   if (isStr(data)) {
    //     // eslint-disable-next-line no-new-func
    //     const fun = new Function(data)
    //     fun();
    //     //console.log("收到的数据", data)
    //     console.log("eval后", window.rxPlugin)
    //   }
    // })
    const script = document.createElement("script", {});
    script.type = "module";
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
        console.log("Script错误", e)
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
  const load = useCallback(async (url: string, type: PluginType, oldInfo?: IPluginInfo): Promise<IInstalledPlugin> => {
    console.assert(url, "Plugin url is emperty");
    try {
      const plugin = await loadPlugin(url)
      if(plugin){
        return {
          pluginInfo: {
            ...getPlugInfo(plugin, url, type),
            ...oldInfo || {},
          },
          plugin,
          status: PluginStatus.Normal
        }        
      }else{
        console.error("Load plugin failed")
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