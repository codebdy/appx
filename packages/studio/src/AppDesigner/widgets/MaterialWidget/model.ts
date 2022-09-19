import { IDesignerComponents, DnFC, DnComponent } from "@designable/react"
import React from "react";

export interface Material {
  name: string;
  designer: DnFC<any> | DnComponent<any>;
  component: React.FC<any> | React.Component;
}

export interface MaterialGroup {
  title: string;
  materials: Material[];
}

export interface IComponents {
  [key: string]: React.FC<any> | React.Component<{}, {}, any>;
}

export function convertMaterialsToComponentDesigners(tabs: MaterialModule[]): IDesignerComponents {
  const coms: IDesignerComponents = {}
  for (const tab of tabs) {
    for (const group of tab.groups) {
      for (const material of group.materials) {
        coms[material.name] = material.designer
      }
    }
  }
  return coms
}

export function convertMaterialsToComponents(tabs: MaterialModule[]): IComponents {
  const coms: IComponents = {}
  for (const tab of tabs) {
    for (const group of tab.groups) {
      for (const material of group.materials) {
        coms[material.name] = material.component
      }
    }
  }
  return coms
}

export enum OperationType {
  Upload = 1,
  Debug,
  Market
}

export interface MaterialModule {
  name: string,
  url: string,
  operationType: OperationType,
  scriptElements: HTMLScriptElement[],
  groups: MaterialGroup[],
}