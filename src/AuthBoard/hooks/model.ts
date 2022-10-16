import { IPage, IPageCategory } from "../../model";

export interface IAuthComponent {
  name: string;
  title: string;
}

export interface IAuthPage {
  page: IPage,
  components: IAuthComponent[]
}

export interface IAuthCategory {
  cagegory: IPageCategory,
  pages: IAuthPage[]
}