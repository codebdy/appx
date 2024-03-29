import { IPlugin } from "@rxdrag/appx-plugin-sdk";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { IPredefinedPlugins } from "../contexts";
declare const window: Window & { rxPlugin: IPlugin };

function loadOne(p: () => Promise<any>): Promise<IPlugin> {
  return new Promise((resolve, reject) => {
    p().then(() => {
      let plugin;
      if (window.rxPlugin) {
        plugin = window.rxPlugin;
      }
      window.rxPlugin = undefined;
      resolve(plugin);
    }).catch(err => {
      reject(err);
    });
  })
}

async function loadList(promises: (() => Promise<any>)[]) {
  const plugins = [];
  for (const p of promises) {
    plugins.push(await loadOne(p));
  }
  return plugins;
}


export function useLoadPredefinedPlugins() {
  const [basicPlugins, setBasicPlugins] = useState<IPlugin[]>();
  const [frameworkPlugins, setFrameworkPlugins] = useState<IPlugin[]>();
  const { t } = useTranslation();

  useEffect(() => {
    console.log("加载预定义插件")
    loadList([
      () => import("~/plugins/inputs/index"),
      () => import("~/plugins/layouts/index"),
      () => import("~/plugins/arrays/index"),
      () => import("~/plugins/displays/index"),
      () => import("~/plugins/actions/index"),
      () => import("~/plugins/processes/index"),
    ]).then((basicPlugs) => {
      setBasicPlugins(basicPlugs);
      loadList([
        () => import("~/plugins/framelayouts/index"),
        () => import("~/plugins/framewidgets/index"),
      ]).then((framePlugins) => {
        setFrameworkPlugins(framePlugins)
      })
    })
  }, [t])

  const predefinedPlugins: IPredefinedPlugins = useMemo(() => ({
    basicPlugins,
    frameworkPlugins
  }),
    [basicPlugins, frameworkPlugins]);

  return predefinedPlugins;
}