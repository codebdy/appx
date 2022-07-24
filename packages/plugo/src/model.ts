import { IDesignerComponents, DnFC, DnComponent } from "@designable/react"

export interface Material {
  name: string;
  component: DnFC<any> | DnComponent<any>;
}

export interface MaterialGroup {
  title: string;
  materials: Material[];
}

export interface MaterialTab {
  title: string;
  groups: MaterialGroup[]
}