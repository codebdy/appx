import { IBehaviorCreator, IDesignerLocales, IResourceCreator } from "@designable/core";

export interface IApperComponent {
  name: string;
  isPredefined?: boolean;
  xComponent?: React.FC<any> | React.Component;
  xDesigner?: React.FC<any> | React.Component;
  resource?: IResourceCreator;
  behavior?: IBehaviorCreator;
}

export interface ComponentCategory {
  name: string;
  locales: IDesignerLocales;
  components: IApperComponent[];
}
