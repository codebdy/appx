export interface IMaterialTab {
  title: string;
  uuid: string;
  collopsesItems: IMaterialCollapseItem[];
}

export interface IMaterialCollapseItem {
  title: string;
  uuid: string;
  components: string[];
}
