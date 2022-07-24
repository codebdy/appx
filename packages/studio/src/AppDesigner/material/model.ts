import { IDesignerComponents, DnFC, DnComponent } from "@designable/react"

export interface Material {
  name: string;
  component: DnFC<any> | DnComponent<any>;
  xComponent: React.FC<any> | React.Component;
}

export interface MaterialGroup {
  title: string;
  materials: Material[];
}

export function convertMaterialsToComponents(tabs: MaterialModule[]): IDesignerComponents {
  const coms: IDesignerComponents = {}
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
  Debug
}

export interface MaterialModule {
  name: string,
  url: string,
  operationType: OperationType,
  scriptElements: HTMLScriptElement[],
  groups: MaterialGroup[],
}