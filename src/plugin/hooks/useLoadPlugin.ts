import { IPlugin } from "@rxdrag/appx-plugin-sdk";
import { useCallback } from "react";
import { IPluginInfo, PluginType } from "~/model";
import { useDesignerParams } from "~/plugin-sdk/contexts/desinger";
import { IInstalledPlugin, PluginStatus } from "../model";
import { useGetPluginInfo } from "./useGetPluginInfo";

declare const window: Window & { rxPlugin: IPlugin | undefined };
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
        console.log("加载结果", window.rxPlugin)
        window.rxPlugin = undefined
        rxPlugin && resolve(rxPlugin);
        script?.remove();
      })
      .catch(err => {
        reject(err);
      })
  })

  return p;
}

export function loadDebugPlugin(url: string): Promise<IPlugin> {
  const path = trimUrl(url);
  const indexJs = path + "index.js";
  const venderJs = path + "vendors~index.js";

  console.log("加载前", window.rxPlugin);

  const p = new Promise<IPlugin>((resolve, reject) => {
    loadJS(venderJs, true)
      .then((script) => {
        const venderScript = script;
        loadJS(indexJs, true)
          .then((script) => {
            window.rxPlugin && resolve(window.rxPlugin);
            window.rxPlugin = undefined
            venderScript?.remove();
            script?.remove();
          })
          .catch(err => {
            reject(err);
            venderScript?.remove();
          })
      })
      .catch(err => {
        reject(err);
      })
  })

  return p;
}


export function useLoadPlugin() {
  const { app } = useDesignerParams();
  const getPlugInfo = useGetPluginInfo();
  const load = useCallback(async (url: string, type: PluginType, oldInfo?: IPluginInfo): Promise<IInstalledPlugin> => {
    console.assert(url, "Plugin url is emperty");
    try {
      const plugin = type === PluginType.debug ? await loadDebugPlugin(url) : await loadPlugin(url)
      if (plugin) {
        return {
          pluginInfo: {
            ...getPlugInfo(plugin, url, type),
            ...oldInfo || {},
          },
          plugin,
          status: PluginStatus.Normal
        }
      } else {
        console.error("Load plugin failed")
        throw new Error("Load plugin failed")
      }

    } catch (error) {
      return {
        pluginInfo: {
          ...oldInfo || {},
          app: app,
          url,
          type
        },
        status: PluginStatus.Error
      }
    }
  }, [app?.uuid, getPlugInfo]);

  return load;
}