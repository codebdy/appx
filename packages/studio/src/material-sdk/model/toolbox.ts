export interface IMaterialTab {
  title: string;
  collopsesItems: IMaterialCollapseItem[];
}

export interface IMaterialCollapseItem {
  title: string;
  sources: string[];
}
