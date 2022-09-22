import { IPlugin } from "@rxdrag/appx-plugin-sdk";

declare const window: Window & { rxPlugin: IPlugin };

export interface LoadedData {
  scripts: HTMLScriptElement[];
  rxPlugin?: IPlugin;
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

export function loadDebugModule(url: string): Promise<LoadedData> {
  const path = trimUrl(url);
  const indexJs = path + "index.js";
  const venderJs = path + "vendors~index.js";
  const loadedData: LoadedData = {
    scripts: []
  }

  console.log("加载前", window.rxPlugin);

  const p = new Promise<LoadedData>((resolve, reject) => {
    loadJS(venderJs, true)
      .then((script) => {
        loadedData.scripts.push(script);
        loadJS(indexJs, true)
          .then((script) => {
            loadedData.scripts.push(script);
            loadedData.rxPlugin = window.rxPlugin
            window.rxPlugin = undefined
            resolve(loadedData);
          })
          .catch(err => {
            reject(err);
          })
      })
      .catch(err => {
        reject(err);
      })
  })

  return p;
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

function trimUrl(url: string) {
  url = url.trim()
  return url.endsWith("/") ? url : (url + "/");
}
