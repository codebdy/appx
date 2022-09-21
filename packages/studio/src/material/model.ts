import { DnFC, DnComponent } from "@designable/react"
import React from "react";

export interface Material {
  name: string;
  designer: DnFC<any> | DnComponent<any>;
  component: React.FC<any> | React.Component;
}

export interface MaterialGroup {  
  id: string;
  title: string;
  materials: Material[];
}


export interface MaterialTab {
  title: string,
  uuid: string,
  groups: MaterialGroup[],
}