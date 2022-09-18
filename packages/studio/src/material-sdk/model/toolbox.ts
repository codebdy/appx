import { DnFC, DnComponent } from "@designable/react"

export interface IMaterialTab {
  title: string;
  collopsesItems: IMaterialCollapseItem[];
}

export interface IMaterialCollapseItem {
  title: string;
  sources: IMaterialSource[];
}

export interface IMaterialSource {
  name: string;
  source: DnFC<any> | DnComponent<any>;
}