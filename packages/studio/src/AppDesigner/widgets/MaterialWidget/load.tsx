import { MaterialGroup } from "./model";
import { DnFC } from "@designable/react";
import { createBehavior, createResource } from '@designable/core'
import { createVoidFieldSchema } from '@designable/formily-antd'
import React from "react";
import { ComponentCategory, IApperComponent } from "./types";
import { GlobalRegistry } from '@designable/core'

declare const window: Window & { materials: ComponentCategory[] };

export interface LoadedData {
  scripts: HTMLScriptElement[];
  categories?: ComponentCategory[];
}

export function transMaterialGroups(categories: ComponentCategory[]): MaterialGroup[] {
  return categories.map(
    category => {
      GlobalRegistry.registerDesignerLocales(category.locales)
      return {
        title: `${category.name}.title`,
        materials: category.components.map(
          material => ({ ...material, xComponent: material.xComponent, component: transComponment(material) })
        )
      }
    }

  )
}

function transComponment(material: IApperComponent): DnFC<any> {

  const Behavior = createBehavior({
    ...material.behavior,
    designerProps: {
      ...material.behavior.designerProps,
      propsSchema: createVoidFieldSchema((material.behavior.designerProps as any).propsSchema),
    },
    selector: (node) => node.props['x-component'] === 'Card',
  })
  const Resource = createResource(material.resource)

  const dnfc: DnFC<any> = (props) => {
    const Componet = material.xDesigner
    return (
      <Componet
        {...props}
      />
    )
  }

  dnfc.Behavior = Behavior
  dnfc.Resource = Resource
  return dnfc
}

export function loadNormailModule(url: string): Promise<LoadedData> {
  const path = trimUrl(url);
  const indexJs = path + "index.js";
  const loadedData: LoadedData = {
    scripts: []
  }
  const p = new Promise<LoadedData>((resolve, reject) => {
    loadJS(indexJs, true)
      .then((script) => {
        loadedData.scripts.push(script);
        loadedData.categories = window.materials
        window.materials = undefined
        resolve(loadedData);
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

  console.log("加载前", window.materials);

  const p = new Promise<LoadedData>((resolve, reject) => {
    loadJS(venderJs, true)
      .then((script) => {
        loadedData.scripts.push(script);
        loadJS(indexJs, true)
          .then((script) => {
            loadedData.scripts.push(script);
            loadedData.categories = window.materials
            window.materials = undefined
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
